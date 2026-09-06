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

/* Simplified and traditional forms of every character these rules turn on. The
   first version of this file was written in simplified only, so
   "在併發症發生前預警並生成處置建議" — the traditional twin of a string this check
   had just caught — went straight through. Locale coverage is not optional: a
   claim is no safer for being made in zh-TW. */
const C = {
  diagnose: '[诊診][断斷]',
  identify: '[识識][别別]',
  risk: '[风風][险險]',
  stenosis: '[狭狹]窄',
  warn: '[预預]警',
  predict: '[预預][测測]',
  occur: '[发發]生',
  complication: '[并併][发發]症',
  manage: '[处處]置',
  order: '[医醫][嘱囑]',
  prescription: '[处處]方',
  plan: '方案',
  decide: '[决決][定策]',
  formulate: '(?:制定|[拟擬]定)',
  auto: '自[动動]',
  analyse: '(?:分析|判[读讀])',
  personalised: '(?:个性化|個性化|個人化)',
  parameter: '[参參][数數]',
  clinician: '(?:[医醫][师師生]|[护護]士)',
  guarantee: '(?:保[证證]|确保|確保)',
  research: '(?:研究|[验驗][证證])',
}
const zh = (s) => new RegExp(s.replace(/\{(\w+)\}/g, (_, k) => C[k]))

const RULES = [
  {
    id: 'autonomous-action',
    why: 'Describes the system acting rather than assisting a clinician.',
    /* "AI分析" on its own is fine — it appears in workflow lists and claims
       nothing. What crosses the line is analysis that arrives at a clinical
       conclusion: a diagnosis, a risk identified, a plan drawn up. */
    zh: zh(
      'AI\\s*(?:{auto}|自主)?{analyse}[^。；]{0,24}(?:{diagnose}|{identify}[^。；]{0,6}(?:{risk}|{stenosis})|{formulate}|生成[^。；]{0,8}(?:{plan}|{prescription}|{order}))' +
        '|{auto}(?:{diagnose}|开立|開立|下{order}|{manage})' +
        '|AI\\s*{decide}|机器自主|機器自主'
    ),
    en: /\bAI\s+(?:automatically\s+)?(?:diagnoses|decides|determines|prescribes|treats)\b|autonomous(?:ly)?\s+(?:diagnos|treat|decid)/i,
    /* Japanese is not a dialect of Chinese and does not fall through to the rule
       above: it reaches the same claim through 解析・判定・作成・決定, which share
       almost no characters with the Chinese forms. */
    ja: /AI[^。]{0,20}(?:自動的に)?(?:解析|分析)[^。]{0,24}(?:診断|判定|(?:治療)?計画[^。]{0,4}作成)|自動(?:診断|判定)|AIが[^。]{0,12}決定/,
  },
  {
    id: 'unregistered-prediction',
    why: 'Prediction and pre-event warning are in-validation, not registered functions.',
    zh: zh(
      '(?:{occur}|{complication})前.{0,10}(?:{warn}|{predict})' +
        '|{risk}{predict}|{predict}性(?:{diagnose}|[评評]估)' +
        '|{identify}.{0,4}(?:{stenosis}|{risk})(?!.*{research})' +
        '|(?:干体重|乾體重)[^。；]{0,10}(?:建[议議]|推荐|推薦|{predict})(?![\\s\\S]*{research})' +
        '|(?:超滤|超濾)曲线|(?:超滤|超濾)曲線'
    ),
    en: /\bpredict(?:s|ive)?\s+(?:risk|complication|hypotension)|\bbefore\s+(?:the\s+)?(?:complication|event)\s+occurs|\bdry[- ]weight\b[^.]{0,20}\brecommendation/i,
    ja: /(?:合併症|発症)[^。]{0,10}前に[^。]{0,10}(?:予測|警告|予知)|リスク(?:予測|判定)|ドライウェイト[^。]{0,8}(?:予測|推奨)(?![\s\S]*研究)/,
  },
  {
    id: 'personalised-prescription',
    why: 'Suggesting treatment parameters is a prescribing claim unless framed as reference.',
    zh: zh(
      '{personalised}(?:{parameter}|{prescription}|治疗方案|治療方案)推荐' +
        '|{personalised}(?:{parameter}|{prescription})推薦' +
        '|{auto}(?:生成|推荐|推薦).{0,6}(?:{prescription}|{parameter}|{plan})(?!.*(?:参考|參考|由{clinician}))'
    ),
    en: /personalis(?:ed|zed)\s+(?:parameter|prescription)\s+recommendation/i,
    ja: /個別化された?[^。]{0,8}(?:パラメータ|処方)[^。]{0,6}(?:推奨|提案)|自動で[^。]{0,8}(?:推奨|処方)(?![^。]*参考)/,
  },
  {
    id: 'overclaim',
    why: 'Guarantees an outcome or claims elimination of risk.',
    zh: zh(
      '{guarantee}.{0,6}(?:[疗療][效效]|效果|结果|結果|治[愈癒])' +
        '|零{risk}|消除(?:[错錯][误誤]|{risk})|百分之百|完全避免'
    ),
    en: /guarantee(?:s|d)?\s+(?:outcome|result|efficacy)|zero\s+risk|eliminat(?:es|ing)\s+error/i,
    ja: /(?:効果|結果|治療成績)を(?:保証|確約)|リスクはゼロ|(?:ミス|エラー)を(?:完全に)?(?:排除|なくし)/,
  },
  {
    id: 'replaces-clinician',
    why: 'Claims the system replaces clinical staff.',
    zh: zh('(?:取代|替代|无需|無需){clinician}'),
    en: /replac(?:es|ing)\s+(?:the\s+)?(?:physician|clinician|nurse|doctor)/i,
    ja: /(?:医師|看護師)(?:に)?(?:代わ|取って代わ)|医師(?:は)?不要/,
  },
]

/* Strings that match a pattern but are safe, each with the reason it is safe. */
const ALLOW = new Map([
  ['termsPage.sections[12].content', 'Legal warranty disclaimer — "不提供任何形式的保证" is the disclaimer itself.'],
  ['investorsPage.materialsNote', 'Forward-looking-statement disclaimer, which must say it is not a guarantee.'],
])

/*
  The check proves itself before it checks anything else.

  The first version passed cleanly while letting every Japanese phrasing and one
  traditional-Chinese phrasing through, because its patterns were written in
  simplified Chinese only. A green tick from a check with holes is worse than no
  check: it is the same output as safety.

  MUST_CATCH holds one plausible violation per rule per locale. MUST_PASS holds
  copy that is on the right side of the line and must never be blocked. Add to
  both whenever a rule changes.
*/
const MUST_CATCH = [
  ['zh-CN', 'autonomous-action', 'AI分析超声影像，识别狭窄风险，制定个性化治疗方案'],
  ['zh-TW', 'autonomous-action', 'AI分析超音波影像，識別狹窄風險，制定個人化治療方案'],
  ['zh-CN', 'unregistered-prediction', '在并发症发生前生成预警与处置建议'],
  ['zh-TW', 'unregistered-prediction', '在併發症發生前預警並生成處置建議'],
  ['zh-CN', 'personalised-prescription', '个性化参数推荐'],
  ['zh-CN', 'unregistered-prediction', '干体重评估与建议'],
  ['en', 'unregistered-prediction', 'Dry Weight Assessment & Recommendations'],
  ['zh-CN', 'overclaim', '保证治疗效果，零风险'],
  ['zh-CN', 'replaces-clinician', '系统可以取代医师完成评估'],
  ['ja', 'autonomous-action', 'AIが超音波画像を自動的に解析し、狭窄リスクを判定して治療計画を作成します。'],
  ['ja', 'unregistered-prediction', 'AIが合併症の発生前に予測し、警告します。'],
  ['ja', 'personalised-prescription', '個別化されたパラメータを自動で推奨します。'],
  ['ja', 'overclaim', '治療の効果を保証します。'],
  ['ja', 'replaces-clinician', '医師に代わって評価を行います。'],
  ['en', 'autonomous-action', 'The AI diagnoses vascular conditions autonomously.'],
  ['en', 'unregistered-prediction', 'The platform predicts risk of intradialytic hypotension.'],
  ['en', 'overclaim', 'We guarantee outcomes with zero risk.'],
  ['en', 'replaces-clinician', 'The system replaces the physician for routine review.'],
]

const MUST_PASS = [
  ['zh-CN', '把数据采集、AI分析、报警升级、床旁执行与质控复盘串成一个数字化工作流'],
  ['zh-CN', '超声影像按标准化模板整理并汇总血管评估记录，供医师查阅；评估与治疗方案由医师作出。'],
  ['zh-CN', '干体重预测与透中低血压预警仍处于研究验证阶段。'],
  ['zh-TW', '乾體重預測與透析中低血壓預警仍處於研究驗證階段。'],
  ['ja', 'ドライウェイト予測は研究段階であり、認証済みの臨床機能ではありません。'],
  ['en', 'Suggestions are provided for reference; the clinician confirms every action.'],
  /* The regulatory page's own in-validation disclosure names every research
     capability by name. It must never be blocked — it is the disclosure. */
  ['ja', 'ドライウェイト予測、心不全リスク評価、透析中低血圧の早期警告。研究プログラムであり、登録された臨床機能としては提供されません。'],
  ['zh-CN', '干体重预测、心衰风险、透中低血压预警属于研究验证阶段，不作为已注册的临床功能提供。'],
]

function patternFor(rule, locale) {
  return locale === 'en' ? rule.en : locale === 'ja' ? rule.ja : rule.zh
}

const selfTest = []
for (const [locale, ruleId, probe] of MUST_CATCH) {
  const rule = RULES.find((r) => r.id === ruleId)
  if (!rule) selfTest.push(`unknown rule "${ruleId}" in MUST_CATCH`)
  else if (!patternFor(rule, locale).test(probe)) {
    selfTest.push(`[${locale}] ${ruleId} FAILED TO CATCH: ${probe}`)
  }
}
for (const [locale, probe] of MUST_PASS) {
  for (const rule of RULES) {
    if (patternFor(rule, locale).test(probe)) {
      selfTest.push(`[${locale}] ${rule.id} WRONGLY BLOCKS: ${probe}`)
    }
  }
}
if (selfTest.length) {
  console.error('\n\x1b[31m✗ the check itself is broken — it cannot be trusted to gate anything\x1b[0m\n')
  for (const line of selfTest) console.error(`  ${line}`)
  console.error('')
  process.exit(2)
}

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
      const pattern = patternFor(rule, locale)
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
    `(${RULES.length} rules × ${LOCALES.length} locales, ${MUST_CATCH.length} self-tests)`
)
