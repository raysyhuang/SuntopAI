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

/*
  Rules match the forbidden ACT, not a particular sentence shape.

  The first version keyed on shapes — "AI", then "分析", then a conclusion — so it
  read "AI分析超声影像…制定治疗方案" but waved through "系统独立完成病情诊断，提前
  预判透中低血压，并为每位患者量身定制治疗计划", which says the same thing in
  plainer words. Marketing copy is written in the plainer words.

  Each rule may carry `unless`: the phrasing that makes the same words safe. That
  is not a loophole, it is the editorial rule itself. "本系统不取代医生" and
  "干体重预测仍处于研究验证阶段" are the sentences we want people to write, and the
  first version rejected both — a check that punishes the correct phrasing teaches
  the opposite of what it exists to teach.
*/
const RULES = [
  {
    id: 'autonomous-action',
    why: 'Describes the system reaching a clinical conclusion rather than supporting one.',
    zh: zh(
      // an actor doing it alone
      '(?:系统|系統|平台|软件|軟體|AI|人工智能|人工智慧|机器|機器)[^。；]{0,12}(?:独立|獨立|自主|{auto}|单独|單獨)[^。；]{0,8}(?:完成|做出|[进進]行|得出)?[^。；]{0,4}(?:{diagnose}|判[断斷]病情)' +
        '|(?:独立|獨立|自主|单独|單獨)[^。；]{0,6}(?:完成|做出|得出)[^。；]{0,6}{diagnose}' +
        // analysis that lands on a clinical conclusion
        '|AI\\s*(?:{auto}|自主)?{analyse}[^。；]{0,24}(?:{diagnose}|{identify}[^。；]{0,6}(?:{risk}|{stenosis})|{formulate}|生成[^。；]{0,8}(?:{plan}|{prescription}|{order}))' +
        // drawing up the plan, however it is phrased
        '|(?<!(?:[医醫][师師生]|[护護]士))(?:{formulate}|定制|訂製|量身[定訂][制製]|[设設][计計])[^。；]{0,8}(?:治[疗療](?:{plan}|[计計][划劃])|{prescription})' +
        '|{auto}(?:{diagnose}|开立|開立|下{order}|{manage})' +
        '|AI\\s*{decide}|机器自主|機器自主'
    ),
    en: /\b(?:AI|system|platform|software)\b[^.]{0,40}\b(?:reach(?:es)?\s+a\s+diagnosis|diagnos(?:es|ing)|independently\s+(?:determin|assess|decid)|design(?:s|ing)?[^.]{0,20}treatment\s+plan|formulat(?:es|ing)[^.]{0,20}(?:plan|prescription))|autonomous(?:ly)?\s+(?:diagnos|treat|decid)|without\s+clinician\s+(?:input|involvement|review)/i,
    /* Japanese shares almost no characters with the forms above: it reaches the
       same claim through 診断・判定・策定・決定. */
    ja: /(?:AI|システム|本製品)[^。]{0,24}(?:独自に|単独で|自動的に)?[^。]{0,8}(?:診断し|診断を行|判定し)|自動(?:診断|判定)|治療(?:方針|計画)[^。]{0,6}(?:策定|作成)し|医師なしで|AIが[^。]{0,12}決定/,
    /* Saying the system does NOT do these things is the point, not a violation. */
    /* Negation only, deliberately. Adding "由医师确认" to "AI 制定治疗方案" does not
       make it true that a clinician formulated the plan — it just bolts a
       disclaimer onto a claim the registration does not cover. An exemption has to
       deny the same claim, not merely mention the clinician. */
    unless: {
      zh: zh('(?:不|未|非|无法|無法|并非|並非|不会|不會|[绝絕]不)[^。；]{0,10}(?:{diagnose}|{formulate}|{decide}|取代|替代|判[断斷]病情)'),
      en: /\b(?:does not|do not|never|cannot|is not|are not|rather than)\b[^.]{0,30}\b(?:diagnos|decid|replac|determin|formulat|design)/i,
      ja: /(?:診断|判定|策定|決定)(?:する)?(?:ものではありません|ことはありません)|(?:診断|判定|策定)(?:し|は)ません/,
    },
  },
  {
    id: 'unregistered-prediction',
    why: 'Prediction and pre-event warning are in-validation, not registered functions.',
    zh: zh(
      '(?:{occur}|{complication})前.{0,10}(?:{warn}|{predict}|[预預]判|[预預]知)' +
        '|提前[^。；]{0,4}(?:[预預]判|{predict}|{warn})' +
        '|{risk}(?:{predict}|[预預]判)|{predict}性(?:{diagnose}|[评評]估)' +
        '|(?<!(?:[医醫][师師生]|[护護]士)){identify}[^。；]{0,4}(?:{stenosis}|{risk})' +
        '|(?:{stenosis}|{risk})[^。；]{0,4}智能{identify}' +
        '|(?:干体重|乾體重)[^。；]{0,10}(?:建[议議]|推荐|推薦|{predict}|[调調]整)' +
        '|(?:超滤|超濾)曲线|(?:超滤|超濾)曲線'
    ),
    en: /\b(?:predict|forecast)(?:s|ing|ive)?\s+(?:the\s+)?(?:risk|complication|hypotension|event)|\bbefore\s+(?:the\s+)?(?:complication|event)\s+occurs|\bdry[- ]weight\b[^.]{0,24}\b(?:recommendation|adjustment)|\bintelligent\s+(?:[\w-]+\s+){0,3}(?:detection|identification|recognition)/i,
    ja: /(?:合併症|発症)[^。]{0,10}前に[^。]{0,10}(?:予測|警告|予知)|事前に[^。]{0,8}予測|リスク(?:予測|判定|検出)|狭窄リスク[^。]{0,6}検出|ドライウェイト[^。]{0,10}(?:予測|推奨|調整)/,
    /* Naming the research tier is the disclosure these rules exist to require. */
    unless: {
      zh: zh('研究(?:[验驗][证證])?(?:阶段|階段)|[验驗][证證]阶段|[验驗][證证]階段|研究[项項]目|尚未注册|尚未註冊|不作[为為]已注册|不作[為为]已註冊|由{clinician}[^。；]{0,8}(?:作出|做出|判[断斷])|{clinician}[^。；]{0,10}(?:作出|做出|最[终終][决決]定)'),
      en: /research\s+(?:programme|program|stage)|not\s+(?:offered|available)\s+(?:as|for)|in[- ]validation|remains?\s+the\s+clinician|\b(?:clinician|physician)\s+(?:decides|judges)/i,
      ja: /研究(?:段階|プログラム)|提供するものではありません|臨床使用はできません|医師が(?:行い|判断)/,
    },
  },
  {
    id: 'personalised-prescription',
    why: 'Suggesting treatment parameters is a prescribing claim unless framed as reference.',
    zh: zh(
      '{personalised}[^。；]{0,6}(?:{parameter}|{prescription}|治疗方案|治療方案|治疗计划|治療計畫)[^。；]{0,4}(?:推荐|推薦|生成|{formulate})' +
        '|量身[定訂][制製][^。；]{0,8}(?:治[疗療]|{plan}|[计計][划劃])' +
        '|{auto}(?:生成|推荐|推薦).{0,6}(?:{prescription}|{parameter}|{plan})'
    ),
    en: /personalis(?:ed|zed)\s+(?:parameter|prescription|treatment\s+plan)\s+(?:recommendation|generation)|tailors?\s+(?:each|the)\s+patient[’']?s?\s+treatment/i,
    ja: /個別化された?[^。]{0,8}(?:パラメータ|処方|治療計画)[^。]{0,6}(?:推奨|提案|作成)|自動で[^。]{0,8}(?:推奨|処方)/,
    unless: {
      zh: zh('(?:仅|僅)?供参考|僅供參考|由{clinician}(?:确认|確認|作出|做出)|{research}'),
      en: /for\s+reference|clinician\s+confirms|research\s+(?:programme|program)/i,
      ja: /参考(?:であり|です|情報)|医師が確認|研究段階/,
    },
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
    unless: {
      zh: zh('(?:不|未|无|無|并非|並非)[^。；]{0,8}{guarantee}|不提供任何'),
      en: /\b(?:no|not|without|disclaim)\w*\s+(?:any\s+)?(?:warrant|guarantee)/i,
      ja: /(?:保証|確約)(?:する)?(?:ものではありません|いたしません)/,
    },
  },
  {
    id: 'replaces-clinician',
    why: 'Claims the system replaces clinical staff.',
    zh: zh('(?:取代|替代){clinician}|(?:无需|無需|不需要){clinician}[^。；]{0,6}(?:介入|[参參]与|[参參]與|判[断斷]|确认|確認|[审審]核|复核|複核|在场|在場)'),
    en: /\breplac(?:e|es|ing)\s+(?:the\s+)?(?:physician|clinician|nurse|doctor)|\bwithout\s+(?:a\s+)?(?:physician|clinician|doctor)\b/i,
    ja: /(?:医師|看護師)(?:に)?(?:代わ|取って代わ)|医師(?:は)?不要|医師なしで/,
    /* "本系统不取代医生" is the sentence we want, and the first version rejected it. */
    unless: {
      zh: zh('(?:不|未|非|无法|無法|并非|並非|不会|不會|[绝絕]不)[^。；]{0,4}(?:取代|替代)'),
      en: /\b(?:does not|do not|never|cannot|is not|are not)\b[^.]{0,20}\breplac/i,
      ja: /(?:代わるもの|置き換えるもの)ではありません|医師(?:に)?代わ(?:り|る)ません/,
    },
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
  /* Plain-language phrasings an external review got past the first rule set. */
  ['zh-CN', 'autonomous-action', '系统独立完成病情诊断，提前预判透中低血压，并为每位患者量身定制治疗计划。'],
  ['zh-TW', 'autonomous-action', '系統獨立完成病情診斷，提前預判透析中低血壓，並為每位病患量身訂製治療計畫。'],
  ['en', 'autonomous-action', 'The platform reaches a diagnosis, forecasts intradialytic hypotension, and designs each patient\u2019s treatment plan without clinician input.'],
  ['ja', 'autonomous-action', '本システムは病状を診断し、透析中低血圧を事前に予測して、医師なしで治療方針を策定します。'],
  ['zh-CN', 'unregistered-prediction', '狭窄风险智能识别'],
  ['en', 'unregistered-prediction', 'Intelligent stenosis risk detection'],
  ['ja', 'unregistered-prediction', 'インテリジェント狭窄リスク検出'],
  /* Bypasses: a disclaimer bolted onto a forbidden claim is not an exemption. */
  ['zh-CN', 'autonomous-action', 'AI分析超声影像，识别狭窄风险，制定个性化治疗方案。建议供参考，由医师确认。'],
  ['zh-CN', 'unregistered-prediction', 'AI提前预判透中低血压并生成处置建议。研究显示效果良好。'],
  ['zh-CN', 'replaces-clinician', '系统取代医师完成评估，医师确认后生效。'],
  ['ja', 'autonomous-action', 'AIが治療方針を策定します。医師が確認します。'],
  ['zh-CN', 'replaces-clinician', '无需医师介入即可完成评估。'],
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
  /* The sentences we want people to write. The first rule set rejected all four. */
  ['zh-CN', '本系统不取代医生，所有诊断均由医生作出。'],
  ['zh-TW', '本系統不取代醫師，所有診斷均由醫師作出。'],
  ['en', 'The platform never replaces the physician; it only displays data.'],
  ['en', 'The system does not replace the physician.'],
  ['ja', 'AIが治療方針を決定するものではありません。'],
  /* The clinician is the actor and the system only carries the result — which is
     the registered scope, not a violation of it. */
  ['zh-CN', '系统仅传输医师制定的治疗方案。'],
  ['zh-CN', '系统显示医师识别狭窄风险后记录的结论。'],
  ['zh-CN', '数据自动传输，无需医生手工录入。'],
  /* Attributing the judgement to the clinician is the required framing, and an
     earlier version of the prediction rule rejected it. */
  ['zh-CN', '系统自动记录每次透析前后的体重数据，整理成趋势视图供医师查阅。干体重的评估与调整由医师作出。'],
  ['zh-TW', '系統自動記錄每次透析前後的體重資料，整理成趨勢檢視供醫師查閱。乾體重的評估與調整由醫師作出。'],
  ['ja', '透析前後の体重を自動記録し、推移として表示します。ドライウェイトの評価と調整は医師が行います。'],
]

function patternFor(rule, locale) {
  return locale === 'en' ? rule.en : locale === 'ja' ? rule.ja : rule.zh
}

/** A rule fires when its pattern matches and nothing in the string makes it safe. */
function violates(rule, locale, value) {
  if (!patternFor(rule, locale).test(value)) return false
  const exempt = rule.unless && (locale === 'en' ? rule.unless.en : locale === 'ja' ? rule.unless.ja : rule.unless.zh)
  return !(exempt && exempt.test(value))
}

const selfTest = []
for (const [locale, ruleId, probe] of MUST_CATCH) {
  const rule = RULES.find((r) => r.id === ruleId)
  if (!rule) selfTest.push(`unknown rule "${ruleId}" in MUST_CATCH`)
  else if (!violates(rule, locale, probe)) {
    selfTest.push(`[${locale}] ${ruleId} FAILED TO CATCH: ${probe}`)
  }
}
for (const [locale, probe] of MUST_PASS) {
  for (const rule of RULES) {
    if (violates(rule, locale, probe)) {
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
      if (violates(rule, locale, value)) {
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
