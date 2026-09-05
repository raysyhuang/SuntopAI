/**
 * Fails if a dictionary string is a bare copy of a figure that lives in facts.ts.
 *
 *   node scripts/check-figure-drift.mjs
 *
 * facts.ts is the single source for every number on the site, and components are
 * meant to render them through publicFact(). Nothing stops someone pasting "5000+"
 * into a dictionary instead, and once that happens the two drift apart silently:
 * refreshing facts.ts leaves the dictionary copy stale, in four locales at once.
 *
 * That is not hypothetical. In September 2026 the company page said 3,000 connected
 * machines in Chinese, Traditional Chinese and Japanese while English said 5,000 and
 * facts.ts said 5,000+ — and four dictionary blocks held unused copies of figures
 * that had already gone stale.
 *
 * This only catches a string that is *exactly* a figure, which is the case worth
 * failing a build over. A number quoted inside a sentence is unavoidable in prose and
 * is left alone; keep those few in step by hand.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LOCALES = ['zh-CN', 'zh-TW', 'en', 'ja']

const facts = readFileSync(join(ROOT, 'src/content/facts.ts'), 'utf8')

/** Pull `'some.id': { value: 'X'` pairs straight out of the source. */
const figures = new Map()
for (const m of facts.matchAll(/'([\w.]+)':\s*\{\s*\n\s*value:\s*'([^']*)'/g)) {
  const [, id, value] = m
  if (value.trim().length > 1) figures.set(value.trim(), id)
}

function* walk(node, path = '') {
  if (node && typeof node === 'object' && !Array.isArray(node)) {
    for (const [k, v] of Object.entries(node)) yield* walk(v, path ? `${path}.${k}` : k)
  } else if (Array.isArray(node)) {
    for (const [i, v] of node.entries()) yield* walk(v, `${path}[${i}]`)
  } else if (typeof node === 'string') {
    yield [path, node]
  }
}

const problems = []
for (const locale of LOCALES) {
  const dict = JSON.parse(readFileSync(join(ROOT, `src/i18n/dictionaries/${locale}.json`), 'utf8'))
  for (const [path, value] of walk(dict)) {
    const id = figures.get(value.trim())
    if (id) problems.push({ locale, path, value: value.trim(), id })
  }
}

if (problems.length === 0) {
  console.log(`\x1b[32m✓\x1b[0m No dictionary string duplicates a facts.ts figure (${figures.size} figures checked)`)
  process.exit(0)
}

console.error(`\x1b[31m✗\x1b[0m ${problems.length} dictionary value(s) duplicate a figure from facts.ts:\n`)
for (const p of problems) {
  console.error(`  ${p.locale.padEnd(6)} ${p.path}`)
  console.error(`  ${' '.repeat(6)} "${p.value}" is ${p.id} — render it with publicFact('${p.id}') instead\n`)
}
console.error('A number kept in two places will eventually disagree in one of them.')
process.exit(1)
