/**
 * Canonical facts for the Suntop AI website.
 *
 * Every number that appears anywhere on the site lives here, once, with its source,
 * its counting basis, and the date it was true. Facts are locale-independent — 3,000
 * is 3,000 in every language — so all four locales read the same value and cannot
 * drift apart.
 *
 * Nothing may be rendered without going through `publicFact()`, which refuses to
 * return a figure that is unreconciled or internal. That guard is the point of this
 * file: a number without an agreed basis should fail the build, not reach a
 * hospital director or an investor.
 *
 * Run `npm run facts:check` for the current reconciliation queue.
 */

export type FactStatus =
  /** Sourced, current, agreed. Safe to publish. */
  | 'verified'
  /** Sourced but dated. Confirm it still holds before publishing. */
  | 'needs-review'
  /** Sources disagree, or no source was found. Must be settled before publishing. */
  | 'unreconciled'
  /** Real but commercially sensitive. Never publish. */
  | 'internal'

export type FactAudience = 'public' | 'investor-gated'

export interface ConflictingSource {
  value: string
  source: string
}

export interface Fact {
  /** Display value exactly as it should be rendered, including any "+" or "~". */
  value: string
  /**
   * What is actually being counted. Rendered as a footnote beside headline figures —
   * this is what turns two different-looking numbers into evidence of rigour rather
   * than a contradiction.
   */
  basis: string
  source: string
  /** ISO date or YYYY-MM. Shown as "as of" wherever the figure is prominent. */
  asOf: string
  status: FactStatus
  audience: FactAudience[]
  /**
   * Rival or superseded values found in the reference material, kept as provenance.
   * On a verified fact these document why other documents may state something different.
   */
  conflicts?: ConflictingSource[]
  note?: string
}

/* ------------------------------------------------------------------ *
 * Nomenclature
 * ------------------------------------------------------------------ */

/**
 * Approved naming, decided 2026-08-22.
 *
 *   Suntop Healthcare  — the group and operator
 *   岱特 / Daite        — the technology subsidiary, and the registrant on the
 *                         Class II certificate
 *   胜透 / Suntop AI    — the software product. 胜透 in zh-CN and zh-TW, where it
 *                         already has equity; Suntop AI in en and ja, where 胜透
 *                         has no established name.
 *
 * The registered device name is a regulatory string, not a brand. Use it verbatim
 * on the regulatory page and nowhere else.
 */
export const BRAND = {
  group: {
    'zh-CN': '杏泰医疗',
    'zh-TW': '杏泰醫療',
    en: 'Suntop Healthcare',
    ja: '杏泰医療',
  },
  subsidiary: {
    'zh-CN': '岱特智能科技（上海）有限公司',
    'zh-TW': '岱特智能科技（上海）有限公司',
    en: 'Daite Intelligent Technology (Shanghai) Co., Ltd.',
    ja: '岱特智能科技（上海）有限公司',
  },
  product: {
    'zh-CN': '胜透',
    'zh-TW': '勝透',
    en: 'Suntop AI',
    ja: 'Suntop AI',
  },
  /** Verbatim from the certificate. Regulatory page only. */
  registeredDeviceName: {
    'zh-CN': '血液透析信息处理软件',
    'zh-TW': '血液透析資訊處理軟體',
    en: 'Hemodialysis Information Processing Software',
    ja: '血液透析情報処理ソフトウェア',
  },
} as const

/* ------------------------------------------------------------------ *
 * Regulatory
 * ------------------------------------------------------------------ */

/** Class II medical device registration. Verified against the certificate scan. */
export const REGISTRATION = {
  number: '沪械注准20252210297',
  registrant: BRAND.subsidiary,
  deviceName: BRAND.registeredDeviceName,
  model: '60110700001',
  release: '1',
  structure: 'Standalone software, B/S architecture — client plus cloud server',
  /**
   * The registered scope, verbatim. Deliberately narrow: it covers transmission,
   * display and processing only, and contains no diagnostic, predictive or warning
   * function. All platform copy must stay inside it — see the capability tiers below.
   */
  scope: {
    'zh-CN': '用于对血液净化中心的透析数据进行传输、显示和处理',
    'zh-TW': '用於對血液淨化中心的透析資料進行傳輸、顯示和處理',
    en: 'For the transmission, display and processing of dialysis data in blood purification centers',
    ja: '血液浄化センターの透析データの伝送・表示・処理に使用',
  },
  authority: {
    'zh-CN': '上海市药品监督管理局',
    'zh-TW': '上海市藥品監督管理局',
    en: 'Shanghai Medical Products Administration',
    ja: '上海市薬品監督管理局',
  },
  class: 'II',
  approved: '2025-07-17',
  expires: '2030-07-16',
  /** Renewal must be filed six months before expiry. */
  renewalDue: '2030-01-16',
} as const

/**
 * Which regulatory tier each capability sits in. Every platform page must label
 * its features with one of these, so the site never implies that a research
 * capability is a registered clinical function.
 */
export type CapabilityTier = 'registered' | 'decision-support' | 'in-validation'

export const CAPABILITY_TIERS: Record<CapabilityTier, { capabilities: string[]; disclosure: string }> = {
  registered: {
    capabilities: [
      'ward-rounds',
      'lab-evaluation',
      'foot-management',
      'quality-control',
      'lab-reminders',
      'central-monitoring',
      'bedside-terminal',
      'facility-iot',
    ],
    disclosure: 'Covered by registration 沪械注准20252210297.',
  },
  'decision-support': {
    capabilities: ['ai-drafting', 'attribution-analysis', 'reference-suggestions'],
    disclosure: 'Suggestions are provided for reference; the clinician confirms every action.',
  },
  'in-validation': {
    capabilities: ['dry-weight-prediction', 'heart-failure-risk', 'idh-early-warning', 'four-item-monitoring'],
    disclosure:
      'Research programme. Not offered as a registered clinical function and not available for clinical use.',
  },
}

/* ------------------------------------------------------------------ *
 * Partnerships
 * ------------------------------------------------------------------ */

/**
 * How prominently a named partner may be presented.
 *
 *   'low-key'  — may be named in body copy and on the partners page, but not used
 *                as a hero claim, a homepage logo wall, or a headline.
 *   'featured' — may anchor a page or campaign.
 *
 * Naming a clinical or corporate partner publicly always needs their agreement;
 * `approvedOn` records when we were told it was cleared.
 */
export type PartnershipProminence = 'low-key' | 'featured'

export interface Partnership {
  id: string
  partner: string
  partnerZh?: string
  /** What the relationship actually is — stated plainly, no inflation. */
  what: string
  evidence: string
  prominence: PartnershipProminence
  approvedOn: string
}

export const PARTNERSHIPS: Partnership[] = [
  {
    id: 'itochu',
    partner: 'ITOCHU Corporation',
    partnerZh: '伊藤忠商事',
    what: 'Strategic partnership with Suntop Healthcare Group, formalised at a signing ceremony.',
    evidence: 'Signing ceremony photography, Company Overview deck',
    prominence: 'low-key',
    approvedOn: '2026-08-22',
  },
  {
    id: 'boston-scientific-gmu',
    partner: 'Boston Scientific · The Fifth Affiliated Hospital of Guangzhou Medical University',
    partnerZh: '波士顿科学 · 广州医科大学附属第五医院',
    what:
      'Co-established hemodialysis vascular access center and vascular access technical training base.',
    evidence: 'Co-branded center and training-base plaques, Company Overview deck',
    prominence: 'low-key',
    approvedOn: '2026-08-22',
  },
]

/* ------------------------------------------------------------------ *
 * Facts
 * ------------------------------------------------------------------ */

export const FACTS = {
  /* ---- Group scale — 杏泰 Suntop Healthcare ---- */

  'group.provinces': {
    value: '25+',
    basis: 'Provinces containing at least one hospital served by the group',
    source: 'Suntop Official Company Overview deck',
    asOf: '2023-12',
    status: 'needs-review',
    audience: ['public', 'investor-gated'],
    note: 'Nearly three years old. Confirm or refresh.',
  },
  'group.hospitalsServed': {
    value: '800+',
    basis: 'Hospitals served across all business lines, cumulative',
    source: 'Suntop Official Company Overview deck',
    asOf: '2023-12',
    status: 'needs-review',
    audience: ['public', 'investor-gated'],
  },
  'group.cooperativeCenters': {
    value: '100+',
    basis:
      'Top private hospital partners in the CDC network, counted at the hospital level. Broader than the hospitals under a management contract and broader than the centers running the platform. Some are reached indirectly, through partner companies that operate several hospitals, rather than under a direct contract with the group',
    source: 'Confirmed by Suntop',
    asOf: '2026-09-05',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [
      { value: '300+ cooperative centers', source: 'Company Overview deck, 2023-12 (cumulative basis)' },
      { value: '18 managed hospitals', source: 'Koology 托管医院汇总, 2026 (management-contract basis only)' },
    ],
    note:
      'Basis corrected 2026-09-05. It previously read "partner centers currently running the Suntop platform", which conflated three different populations and made this figure look like a restatement of platform.institutionsDeployed. CDC counts partner hospitals; only some are under a management contract, and only some run the platform. Two things a reader in diligence will ask about, so say them before being asked: the financial system\'s 托管医院汇总 counts only the management-contract subset and is much smaller by design, and part of the CDC count is reached through partner companies operating several hospitals rather than through a direct contract. The 2023 deck\'s 300+ is cumulative rather than current.',
  },
  'group.annualTreatments': {
    value: '4.5M+',
    basis: 'Dialysis treatments performed annually across the served network',
    source: 'Suntop Official Company Overview deck',
    asOf: '2023-12',
    status: 'needs-review',
    audience: ['public', 'investor-gated'],
  },
  'group.patientsTreated': {
    value: '30,000+',
    basis: 'Patients treated annually across the served network',
    source: 'Suntop Official Company Overview deck',
    asOf: '2023-12',
    status: 'needs-review',
    audience: ['public', 'investor-gated'],
  },
  'group.idcOperating': {
    value: '30+',
    basis:
      'Dialysis centers built, owned and operated by the group',
    source: 'Confirmed by Suntop',
    asOf: '2026-08-22',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [
      { value: '40 IDCs', source: 'Company Overview deck, 2023-12 (includes pipeline)' },
      { value: '30 own centers', source: 'Dalian 5G brief, 2024-09' },
    ],
    note:
      'Site figure adopted as canonical, 2026-08-22. The 2023 deck\'s 40 includes acquisition-pipeline sites not yet operating.',
  },
  'group.vascularAccessCenters': {
    value: '10+',
    basis: 'Vascular access centers or physician workstations co-established with CDC hospitals',
    source: 'Suntop Official Company Overview deck',
    asOf: '2023-12',
    status: 'needs-review',
    audience: ['public'],
  },
  'group.supplyChainCustomers': {
    value: '~1,000',
    basis: 'Customers supplied through the Suntop Prime supply chain',
    source: 'Suntop Official Company Overview deck',
    asOf: '2023-12',
    status: 'needs-review',
    audience: ['public', 'investor-gated'],
  },

  /* ---- Platform scale — 胜透 / Suntop AI ---- */

  'platform.machinesConnected': {
    value: '5000+',
    basis:
      'Dialysis machines connected to the Suntop AI platform across self-operated and partner centers',
    source: 'Confirmed by Suntop',
    asOf: '2026-08-22',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [
      { value: '3000+', source: '岱特AI wiki §1–2, 2026-07' },
      { value: '1,200 on 5G', source: 'Dalian 5G brief, 2024-09' },
    ],
    note:
      'Site figure adopted as canonical, 2026-08-22, and supersedes the 3,000+ recorded in the 岱特AI wiki in July 2026.',
  },
  'platform.institutionsDeployed': {
    value: '100+',
    basis:
      'Centers running the Suntop AI platform; a single contracting institution may operate several centers',
    source: 'Confirmed by Suntop',
    asOf: '2026-08-22',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [
      { value: '50+ institutions', source: '岱特AI wiki §3, 2026-07 (institutions, not centers)' },
      { value: '50 fully deployed smart dialysis centers', source: '2026 outlook, 2025-12 (complete deployment only)' },
    ],
    note:
      'Site figure adopted as canonical, 2026-08-22. Three populations are in play and they are easy to confuse: 50+ contracting institutions, 100+ centers running the platform, and 50 centers with the complete smart-dialysis deployment. Whichever is quoted, say which — and note this is a different population again from group.cooperativeCenters, which counts partner hospitals rather than platform deployments.',
  },
  'platform.patientsOnSystem': {
    value: '~8,000',
    basis: 'Cumulative patients with records on the platform',
    source: '岱特AI wiki §4',
    asOf: '2026-04',
    status: 'verified',
    audience: ['public', 'investor-gated'],
  },
  'platform.monitoringRecords': {
    value: '~1,000,000',
    basis: 'Dialysis session monitoring records held',
    source: '岱特AI wiki §4',
    asOf: '2026-04',
    status: 'verified',
    audience: ['public', 'investor-gated'],
  },
  'platform.iotRecords': {
    value: '~5,000,000',
    basis: 'Dialysis machine IoT telemetry records held',
    source: '岱特AI wiki §4',
    asOf: '2026-04',
    status: 'verified',
    audience: ['public', 'investor-gated'],
  },
  'platform.dataExportProgress': {
    value: '~3%',
    basis: 'Share of held data exported into training-ready form',
    source: '岱特AI wiki §4',
    asOf: '2026-04',
    status: 'internal',
    audience: [],
    note: 'Never publish. Undercuts the data-asset narrative and is a competitive disclosure.',
  },
  'platform.alarmTypes': {
    value: '20+',
    basis:
      'Core and dynamic alarm types raised by the monitoring system',
    source: 'Confirmed by Suntop',
    asOf: '2026-08-22',
    status: 'verified',
    audience: ['public'],
    note:
      'Confirmed by Suntop, 2026-08-22. No written source exists in the reference material; if this figure is ever challenged, an alarm-type inventory would substantiate it.',
  },

  /* ---- Center network — verified from public/data/centers-*.json ---- */

  'network.centersListed': {
    value: '20',
    basis: 'Centers published on the network map, self-operated and partner combined',
    source: 'public/data/centers-*.json',
    asOf: '2026-08-22',
    status: 'verified',
    audience: ['public'],
  },
  'network.selfOperatedListed': {
    value: '11',
    basis: 'Self-operated centers published on the network map',
    source: 'public/data/centers-*.json',
    asOf: '2026-08-22',
    status: 'verified',
    audience: ['public'],
  },

  /* ---- Market (investor track) ---- */

  /**
   * Prevalence is stated in patients per million population (pmp), the unit the
   * national registries publish. The four values do not share a year — each is the
   * latest its registry has released — so the chart must show the year beside each
   * bar and be read as an order-of-magnitude comparison, not a like-for-like one.
   *
   * China is the only derived figure here: the registry publishes a patient count,
   * not a rate. Everything else is the rate its registry published.
   */
  'market.chinaPrevalence': {
    value: '840 pmp',
    basis:
      'Dialysis patients per million population. Derived: 1,183,000 patients (CNRDS, end-2024) over a national population of 1.408 billion (NBS, end-2024)',
    source: 'Chinese Society of Nephrology / CNRDS; National Bureau of Statistics',
    asOf: '2024',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [{ value: '<0.07%', source: 'Annual Data Report cited in Company Overview deck, 2016' }],
    note:
      'Derived, not published as a rate. Refreshed 2026-09-04 from the CNRDS 2024 year-end figures presented at the CSN conference in July 2025, superseding the 2016 figure.',
  },
  'market.japanPrevalence': {
    value: '2,725 pmp',
    basis: 'Dialysis patients per million population, as published by the registry',
    source: 'Japanese Society for Dialysis Therapy (JSDT), annual statistical survey, year-end 2024',
    asOf: '2024',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [{ value: '0.23%', source: 'Annual Data Report cited in Company Overview deck, 2016' }],
  },
  'market.taiwanPrevalence': {
    value: '3,771 pmp',
    basis: 'Dialysis patients per million population, as published by the registry',
    source: 'Taiwan Renal Registry Data System (TWRDS)',
    asOf: '2020',
    status: 'needs-review',
    audience: ['public', 'investor-gated'],
    conflicts: [{ value: '0.34%', source: 'Annual Data Report cited in Company Overview deck, 2016' }],
    note:
      'The oldest of the four. TWRDS runs roughly a two-year publication lag; refresh when a newer edition is available.',
  },
  'market.usPrevalence': {
    value: '2,327 pmp',
    basis: 'Adjusted ESRD prevalence per million population, as published by the registry',
    source: 'United States Renal Data System (USRDS), 2025 Annual Data Report',
    asOf: '2023',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [{ value: '0.21%', source: 'Annual Data Report cited in Company Overview deck, 2016' }],
  },
  'market.chinaCagr': {
    value: '12%',
    basis:
      'Compound annual growth rate of hemodialysis patients in China, 2011 to 2024 (234,632 to 1,027,267)',
    source: 'Chinese Society of Nephrology / CNRDS',
    asOf: '2024',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [{ value: '14%', source: 'SDC Chain Proposal Deck, 2023' }],
  },
  'market.chinaPatients': {
    value: '1,183,000',
    basis: 'Dialysis patients in China at year end — 1,027,267 hemodialysis and 156,000 peritoneal dialysis',
    source:
      'Chinese Society of Nephrology / CNRDS, year-end 2024, presented at the CSN conference July 2025',
    asOf: '2024',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [{ value: '1,000,000', source: 'SDC Chain Proposal Deck, 2023' }],
  },
  'market.chinaNewPatients': {
    value: '220,270',
    basis: 'Patients newly starting hemodialysis in China during the year',
    source: 'Chinese Society of Nephrology / CNRDS, 2024',
    asOf: '2024',
    status: 'verified',
    audience: ['public', 'investor-gated'],
  },
  'market.chinaCenters': {
    value: '8,456',
    basis:
      'Hemodialysis centers in China — 31.6% tertiary hospitals, 51.5% secondary, 17.0% other',
    source: 'Chinese Society of Nephrology / CNRDS, year-end 2024',
    asOf: '2024',
    status: 'verified',
    audience: ['public', 'investor-gated'],
    conflicts: [{ value: '7,512', source: 'CNRDS, year-end 2023' }],
  },
  'market.chinaCkdPrevalence': {
    value: '10.8%',
    basis: 'Chronic kidney disease prevalence among Chinese adults, implying roughly 120 million people',
    source: 'National cross-sectional study, cited by the Chinese Center for Disease Control and Prevention',
    asOf: '2024-07',
    status: 'verified',
    audience: ['public', 'investor-gated'],
  },
} as const satisfies Record<string, Fact>

export type FactId = keyof typeof FACTS

/* ------------------------------------------------------------------ *
 * Clinical outcomes
 * ------------------------------------------------------------------ */

export interface Outcome {
  id: string
  measure: string
  before: string
  after: string
  /** Relative change, only rendered once `method` is filled in. */
  relative?: string
  /**
   * Study design behind the figure. A relative-reduction claim is stronger than
   * the raw pair, so it needs more support, not less — until this is populated the
   * outcome cannot be published.
   */
  method: {
    sites: number | null
    patients: number | null
    period: string | null
    design: string | null
  }
}

/**
 * Source: SUNTOP AI成效数据.docx. Cleared for publication 2026-08-22.
 *
 * The figures are real; the formal study design behind them is not yet documented,
 * and `method` stays null until it is. Until then every outcome must be rendered
 * with `OUTCOMES_ATTRIBUTION` beside it, and the raw before/after pair should lead —
 * a relative-reduction figure is a stronger claim than the pair it is derived from,
 * so `relative` is supplementary, never the headline.
 *
 * `period` is taken from the footnote already published on the live homepage and
 * should be confirmed; sites, patients and design remain undocumented.
 */
export const OUTCOMES: Outcome[] = [
  {
    id: 'pre-dialysis-systolic-bp',
    measure: 'Pre-dialysis systolic blood pressure',
    before: '145±22 mmHg',
    after: '141±21 mmHg',
    method: { sites: null, patients: null, period: '2024–2025', design: null },
  },
  {
    id: 'pre-shock-patients',
    measure: 'Patients in a pre-shock state',
    before: '22.4%',
    after: '9.0%',
    relative: '60% reduction',
    method: { sites: null, patients: null, period: '2024–2025', design: null },
  },
  {
    id: 'lab-evaluation-time',
    measure: 'Laboratory result evaluation time',
    before: '8.3 min/patient',
    after: '2.5 min/patient',
    relative: '70% faster',
    method: { sites: null, patients: null, period: '2024–2025', design: null },
  },
  {
    id: 'anemia-prevalence',
    measure: 'Anemia prevalence',
    before: '60.9%',
    after: '41.3%',
    method: { sites: null, patients: null, period: '2024–2025', design: null },
  },
  {
    id: 'iron-deficiency',
    measure: 'Iron deficiency prevalence',
    before: '74.0%',
    after: '21.1%',
    relative: '71% reduction',
    method: { sites: null, patients: null, period: '2024–2025', design: null },
  },
  {
    id: 'renal-bone-disease',
    measure: 'Renal bone disease prevalence',
    before: '48.4%',
    after: '30.7%',
    relative: '37% reduction',
    method: { sites: null, patients: null, period: '2024–2025', design: null },
  },
]

/**
 * Attribution line that must accompany any published outcome figure while the
 * study design is undocumented. Remove the second sentence once `method` is filled in.
 */
export const OUTCOMES_ATTRIBUTION = {
  'zh-CN': '数据来自杏泰自营透析中心的运行观察。研究设计文档正在整理中。',
  'zh-TW': '資料來自杏泰自營透析中心的營運觀察。研究設計文件正在整理中。',
  en:
    'Observed at Suntop-operated dialysis centers. Formal study documentation is in preparation.',
  ja:
    '杏泰自営透析センターにおける運用観察に基づくデータです。研究設計の文書化を進めています。',
} as const

/** True once an outcome carries a documented study design. */
export function hasDocumentedMethod(outcome: Outcome): boolean {
  const { sites, patients, period, design } = outcome.method
  return sites !== null && patients !== null && period !== null && design !== null
}

/**
 * Outcomes are cleared for publication. Where the method is still undocumented the
 * caller must render `OUTCOMES_ATTRIBUTION` alongside the figure.
 */
export function requiresAttribution(outcome: Outcome): boolean {
  return !hasDocumentedMethod(outcome)
}

/* ------------------------------------------------------------------ *
 * Access
 * ------------------------------------------------------------------ */

export class UnpublishableFactError extends Error {}

/**
 * Resolve a fact for rendering. Throws rather than returning a figure that has no
 * agreed basis, so an unreconciled number fails the build instead of reaching a page.
 */
export function publicFact(id: FactId, audience: FactAudience = 'public'): Fact {
  const fact: Fact = FACTS[id]

  if (fact.status === 'internal' || fact.status === 'unreconciled') {
    throw new UnpublishableFactError(
      `Fact "${id}" is ${fact.status} and cannot be rendered. ` +
        (fact.conflicts?.length
          ? `Conflicting sources: ${fact.conflicts.map((c) => `${c.value} (${c.source})`).join('; ')}. `
          : '') +
        `Settle it in src/content/facts.ts first.`,
    )
  }

  if (!fact.audience.includes(audience)) {
    throw new UnpublishableFactError(
      `Fact "${id}" is not cleared for the "${audience}" audience (cleared for: ${
        fact.audience.join(', ') || 'none'
      }).`,
    )
  }

  return fact
}

/** Every fact still awaiting a decision. Drives `npm run facts:check`. */
export function reconciliationQueue(): Array<{ id: FactId; fact: Fact }> {
  return (Object.keys(FACTS) as FactId[])
    .map((id) => ({ id, fact: FACTS[id] as Fact }))
    .filter(({ fact }) => fact.status === 'unreconciled' || fact.status === 'needs-review')
}
