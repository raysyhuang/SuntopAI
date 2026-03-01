#!/usr/bin/env node

/**
 * Dictionary sync checker — compares all 4 locale JSON files against zh-CN (source of truth).
 * Reports missing keys, orphaned keys, and structural mismatches.
 *
 * Usage: node scripts/check-dict-sync.mjs
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DICT_DIR = resolve(__dirname, '../src/i18n/dictionaries')
const LOCALES = ['zh-CN', 'en', 'ja', 'zh-TW']
const SOURCE = 'zh-CN'

function loadDict(locale) {
  const raw = readFileSync(resolve(DICT_DIR, `${locale}.json`), 'utf-8')
  return JSON.parse(raw)
}

/** Recursively flatten an object into dot-separated key paths */
function flattenKeys(obj, prefix = '') {
  const keys = []
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...flattenKeys(v, path))
    } else {
      keys.push(path)
    }
  }
  return keys
}

// Load all dictionaries
const dicts = {}
for (const locale of LOCALES) {
  try {
    dicts[locale] = loadDict(locale)
  } catch (err) {
    console.error(`Failed to load ${locale}.json: ${err.message}`)
    process.exit(1)
  }
}

const sourceKeys = new Set(flattenKeys(dicts[SOURCE]))
let totalIssues = 0

for (const locale of LOCALES) {
  if (locale === SOURCE) continue

  const localeKeys = new Set(flattenKeys(dicts[locale]))

  // Keys in source but missing from this locale
  const missing = [...sourceKeys].filter(k => !localeKeys.has(k))
  // Keys in this locale but not in source (orphaned)
  const orphaned = [...localeKeys].filter(k => !sourceKeys.has(k))

  if (missing.length === 0 && orphaned.length === 0) {
    console.log(`\x1b[32m✓\x1b[0m ${locale}.json — in sync`)
    continue
  }

  totalIssues += missing.length + orphaned.length

  if (missing.length > 0) {
    console.log(`\n\x1b[31m✗\x1b[0m ${locale}.json — ${missing.length} missing key(s):`)
    for (const k of missing.sort()) {
      console.log(`    - ${k}`)
    }
  }

  if (orphaned.length > 0) {
    console.log(`\n\x1b[33m!\x1b[0m ${locale}.json — ${orphaned.length} orphaned key(s) (not in ${SOURCE}):`)
    for (const k of orphaned.sort()) {
      console.log(`    + ${k}`)
    }
  }
}

console.log('')
if (totalIssues === 0) {
  console.log('\x1b[32mAll dictionaries are in sync with zh-CN.\x1b[0m')
  process.exit(0)
} else {
  console.log(`\x1b[31m${totalIssues} total issue(s) found.\x1b[0m`)
  process.exit(1)
}
