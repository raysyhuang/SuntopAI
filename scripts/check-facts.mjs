#!/usr/bin/env node

/**
 * Facts reconciliation report.
 *
 * Prints every figure that is not yet cleared for publication, grouped by whether
 * sources actively disagree (must be settled) or the figure is simply dated
 * (confirm it still holds). Also lists outcome measures that are cleared for use but
 * still lack a documented study design, and the named partnerships cleared for use.
 *
 * Reporting only — exits 0. The build-time guard is `publicFact()` in
 * src/content/facts.ts, which throws when an unreconciled figure is rendered.
 *
 * Usage: node scripts/check-facts.mjs
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FACTS_FILE = resolve(__dirname, '../src/content/facts.ts')

const src = readFileSync(FACTS_FILE, 'utf-8')

const dim = (s) => `\x1b[2m${s}\x1b[0m`
const red = (s) => `\x1b[31m${s}\x1b[0m`
const yellow = (s) => `\x1b[33m${s}\x1b[0m`
const green = (s) => `\x1b[32m${s}\x1b[0m`
const bold = (s) => `\x1b[1m${s}\x1b[0m`

/**
 * Parse the FACTS object well enough to report on it. Deliberately a light
 * regex pass rather than a TS import — this script must run without a build step.
 */
function parseFacts(text) {
  const start = text.indexOf('export const FACTS = {')
  const end = text.indexOf('} as const satisfies', start)
  if (start === -1 || end === -1) {
    console.error('Could not locate the FACTS object in facts.ts')
    process.exit(1)
  }
  const body = text.slice(start, end)

  const facts = []
  // Each entry begins with a quoted dotted key followed by a brace.
  const entry = /'([a-zA-Z]+\.[a-zA-Z]+)':\s*\{/g
  let m
  const positions = []
  while ((m = entry.exec(body)) !== null) positions.push({ id: m[1], at: m.index })

  positions.forEach((p, i) => {
    const chunk = body.slice(p.at, i + 1 < positions.length ? positions[i + 1].at : body.length)
    const field = (name) => {
      const mm = chunk.match(new RegExp(`${name}:\\s*'((?:[^'\\\\]|\\\\.)*)'`))
      return mm ? mm[1].replace(/\\'/g, "'") : null
    }
    const conflicts = []
    const cre = /\{\s*value:\s*'((?:[^'\\]|\\.)*)',\s*source:\s*'((?:[^'\\]|\\.)*)'\s*\}/g
    let cm
    while ((cm = cre.exec(chunk)) !== null) conflicts.push({ value: cm[1], source: cm[2] })

    facts.push({
      id: p.id,
      value: field('value'),
      basis: field('basis'),
      source: field('source'),
      asOf: field('asOf'),
      status: field('status'),
      note: field('note'),
      conflicts,
    })
  })
  return facts
}

function parseOutcomes(text) {
  const start = text.indexOf('export const OUTCOMES')
  const end = text.indexOf('export const OUTCOMES_ATTRIBUTION', start)
  const body = text.slice(start, end === -1 ? text.length : end)
  const out = []
  const re = /measure:\s*'((?:[^'\\]|\\.)*)'[\s\S]*?method:\s*\{([^}]*)\}/g
  let m
  while ((m = re.exec(body)) !== null) {
    const nulls = (m[2].match(/null/g) || []).length
    out.push({ measure: m[1], missing: nulls })
  }
  return out
}

const facts = parseFacts(src)
const outcomes = parseOutcomes(src)

const blocked = facts.filter((f) => f.status === 'unreconciled')
const dated = facts.filter((f) => f.status === 'needs-review')
const ready = facts.filter((f) => f.status === 'verified')
const internal = facts.filter((f) => f.status === 'internal')

console.log('')
console.log(bold('Facts reconciliation report'))
console.log(dim(`  ${facts.length} figures tracked in src/content/facts.ts`))
console.log('')

if (blocked.length) {
  console.log(red(bold(`✗ ${blocked.length} figure(s) blocked — sources disagree, or no source found`)))
  console.log(dim('  These throw at build time if rendered. Pick one value and basis for each.'))
  console.log('')
  for (const f of blocked) {
    console.log(`  ${bold(f.id)}`)
    console.log(`      claims  ${green(f.value)}  ${dim(`— ${f.source}, ${f.asOf}`)}`)
    for (const c of f.conflicts) {
      console.log(`      versus  ${yellow(c.value)}  ${dim(`— ${c.source}`)}`)
    }
    console.log(`      basis   ${dim(f.basis)}`)
    if (f.note) console.log(`      note    ${dim(f.note)}`)
    console.log('')
  }
}

if (dated.length) {
  console.log(yellow(bold(`! ${dated.length} figure(s) dated — confirm they still hold`)))
  console.log('')
  for (const f of dated) {
    console.log(`  ${f.id.padEnd(32)} ${f.value.padEnd(12)} ${dim(`as of ${f.asOf}`)}`)
  }
  console.log('')
}

const undocumented = outcomes.filter((o) => o.missing > 0)
if (undocumented.length) {
  console.log(yellow(bold(`! ${undocumented.length} outcome measure(s) published without a documented study design`)))
  console.log(dim('  Cleared for use 2026-08-22. Each must render OUTCOMES_ATTRIBUTION alongside the figure'))
  console.log(dim('  until sites, patients, period and design are recorded.'))
  console.log('')
  for (const o of undocumented) {
    console.log(`  ${o.measure.padEnd(44)} ${dim(`${o.missing}/4 method fields missing`)}`)
  }
  console.log('')
}

const partnerships = (src.match(/prominence: '(low-key|featured)'/g) || [])
const lowKey = partnerships.filter((p) => p.includes('low-key')).length
if (partnerships.length) {
  console.log(green(bold(`✓ ${partnerships.length} named partnership(s) cleared`)))
  if (lowKey) console.log(dim(`  ${lowKey} marked low-key — body copy and partners page only, never a hero claim`))
  console.log('')
}

console.log(green(`✓ ${ready.length} figure(s) cleared for publication`))
if (internal.length) console.log(dim(`  ${internal.length} figure(s) marked internal — never published`))
console.log('')
