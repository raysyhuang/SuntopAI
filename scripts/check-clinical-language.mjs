/**
 * Fails when a dictionary string claims a clinical capability the registration
 * does not cover, or claims the system acts rather than assists.
 *
 *   npm run copy:check
 *
 * This exists because seven such strings shipped and stayed shipped. dict:check
 * proves the four locales agree; figures:check proves no figure was copied out of
 * facts.ts; facts:check proves a figure is cleared. Nothing was reading the copy
 * itself, so "AI 自动分析血管条件、识别狭窄风险" sat on a live services page and no
 * check had an opinion about it.
 *
 * The registration (沪械注准20252210297) covers transmission, display and
 * processing. Dry-weight prediction, heart-failure risk, IDH early warning and the
 * four-item monitoring models are `in-validation` in CAPABILITY_TIERS and must
 * never be written as delivered clinical functions.
 *
 * Patterns are deliberately blunt. A false positive costs one line in ALLOW with a
 * reason; a false negative reaches a hospital director. When adding an entry to
 * ALLOW, say why the string is safe — "it is a legal disclaimer", "it names the
 * certificate" — never just to quiet the check.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LOCALES = ['zh-CN', 'zh-TW', 'en', 'ja']

const RULES = [
  {
    id: 'autonomous-action',
    why: 'Describes the system acting rather than assisting a clinician.',
    /* "AI分析" on its own is fine — it appears in workflow lists and claims
       nothing. What crosses the line is analysis that arrives at a clinical
       conclusion: a diagnosis, a risk identified, a plan drawn up. */
    zh: /AI\s*(自动|自主)?(分析|判读)[^。；]{0,24}(诊断|识别[^。；]{0,6}(风险|狭窄|异常)|制定|拟定|生成[^。；]{0,8}(方案|处方|医嘱))|自动(诊断|开立|下医嘱|处置)|AI\s*(决定|决策)|机器自主/,
    en: /\bAI\s+(?:automatically\s+)?(?:diagnoses|decides|determines|prescribes|treats)\b|autonomous(?:ly)?\s+(?:diagnos|treat|decid)/i,
  },
  {
    id: 'unregistered-prediction',
    why: 'Prediction and pre-event warning are in-validation, not registered functions.',
    zh: /发生前.{0,8}(预警|预测)|风险预测|预测性(诊断|评估)|识别.{0,4}(狭窄|风险)(?!.*(研究|验证))|干体重(建议|预测)(?!.*(研究|验证))|超滤曲线/,
    en: /\bpredict(?:s|ive)?\s+(?:risk|complication|hypotension)|\bbefore\s+(?:the\s+)?(?:complication|event)\s+occurs/i,
  },
  {
    id: 'personalised-prescription',
    why: 'Suggesting treatment parameters is a prescribing claim unless framed as reference.',
    zh: /个性化(参数|处方|治疗方案)推荐|自动(生成|推荐).{0,6}(处方|参数|方案)(?!.*(参考|由医师))/,
    en: /personalis(?:ed|zed)\s+(?:parameter|prescription)\s+recommendation/i,
  },
  {
    id: 'overclaim',
    why: 'Guarantees an outcome or claims elimination of risk.',
    zh: /(保证|确保).{0,6}(疗效|效果|结果|治愈)|零风险|消除(错误|风险)|百分之百|完全避免/,
    en: /guarantee(?:s|d)?\s+(?:outcome|result|efficacy)|zero\s+risk|eliminat(?:es|ing)\s+error/i,
  },
  {
    id: 'replaces-clinician',
    why: 'Claims the system replaces clinical staff.',
    zh: /(取代|替代|无需)(医师|医生|护士|临床医师)/,
    en: /replac(?:es|ing)\s+(?:the\s+)?(?:physician|clinician|nurse|doctor)/i,
  },
]

/* Strings that match a pattern but are safe, each with the reason it is safe. */
const ALLOW = new Map([
  ['termsPage.sections[12].content', 'Legal warranty disclaimer — "不提供任何形式的保证" is the disclaimer itself.'],
  ['investorsPage.materialsNote', 'Forward-looking-statement disclaimer, which must say it is not a guarantee.'],
])

function* walk(node, path = '') {
  if (typeof node === 'string') {
    yield [path, node]
  } else if (Array.isArray(node)) {
    for (const [i, v] of node.entries()) yield* walk(v, `${path}[${i}]`)
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) yield* walk(v, path ? `${path}.${k}` : k)
  }
}

const findings = []
for (const locale of LOCALES) {
  const dict = JSON.parse(readFileSync(join(ROOT, `src/i18n/dictionaries/${locale}.json`), 'utf8'))
  for (const [path, value] of walk(dict)) {
    if (ALLOW.has(path)) continue
    for (const rule of RULES) {
      const pattern = locale === 'en' ? rule.en : rule.zh
      if (pattern.test(value)) {
        findings.push({ locale, path, rule, value })
        break
      }
    }
  }
}

if (findings.length) {
  console.error(`\n\x1b[31m✗ ${findings.length} string(s) claim more than the registration covers\x1b[0m\n`)
  for (const f of findings) {
    console.error(`  [${f.locale}] ${f.path}`)
    console.error(`    ${f.rule.id}: ${f.rule.why}`)
    console.error(`    ${f.value.slice(0, 120)}${f.value.length > 120 ? '…' : ''}\n`)
  }
  console.error('  Rewrite so the system assembles and presents while the clinician judges,')
  console.error('  and name the research tier where a capability is still in validation.')
  console.error('  See POSITIONING.md and CAPABILITY_TIERS in src/content/facts.ts.\n')
  process.exit(1)
}

console.log(
  `\x1b[32m✓\x1b[0m No dictionary string claims more than the registration covers ` +
    `(${RULES.length} rules × ${LOCALES.length} locales)`
)
