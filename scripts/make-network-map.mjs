/**
 * Generates public/images/network-map.svg — the network overview on the homepage.
 *
 *   node scripts/make-network-map.mjs
 *
 * Centers come from public/data/centers-zh-CN.json, which is the single source of
 * truth for the network; province outlines come from scripts/china-provinces.json,
 * fetched once and committed so the build never needs the network.
 *
 * Re-run this whenever a center is added, removed or moved. The output is committed
 * rather than generated at build time, so a broken run can never take the site down.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')

const GEO = join(HERE, 'china-provinces.json')
const CENTERS = join(ROOT, 'public/data/centers-zh-CN.json')
const COVERAGE = join(ROOT, 'public/data/network-coverage.json')
const ENABLED = join(ROOT, 'public/data/network-enabled-cities.json')
const OUT = join(ROOT, 'public/images/network-map.svg')

const W = 1000
const H = 830
const PAD = 12

/* Equirectangular with a single cosine correction at the mid-latitude. Across
   China's extent the distortion is small enough that a proper projection would
   not change what a reader takes from the map. */
const [LON0, LON1] = [73.0, 135.5]
const [LAT0, LAT1] = [17.0, 54.0]
const KX = Math.cos((((LAT0 + LAT1) / 2) * Math.PI) / 180)

const raw = (lon, lat) => [(lon - LON0) * KX, LAT1 - lat]
const [X0, Y0] = raw(LON0, LAT1)
const [X1, Y1] = raw(LON1, LAT0)
const S = Math.min((W - 2 * PAD) / (X1 - X0), (H - 2 * PAD) / (Y1 - Y0))
const OFFX = PAD + ((W - 2 * PAD) - (X1 - X0) * S) / 2
const OFFY = PAD + ((H - 2 * PAD) - (Y1 - Y0) * S) / 2

function pt(lon, lat) {
  const [x, y] = raw(lon, lat)
  return [(x - X0) * S + OFFX, (y - Y0) * S + OFFY]
}

function ringsOf(geometry) {
  if (!geometry) return []
  if (geometry.type === 'Polygon') return geometry.coordinates
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat()
  return []
}

function pathFor(geometry) {
  const out = []
  for (const ring of ringsOf(geometry)) {
    if (ring.length < 3) continue
    const pts = []
    let last = null
    for (const [lon, lat] of ring) {
      const [x, y] = pt(lon, lat)
      /* Drop points closer together than half a pixel — invisible at any size the
         map is shown, and it takes the file from ~2MB to ~200KB. */
      if (last && Math.abs(x - last[0]) < 0.6 && Math.abs(y - last[1]) < 0.6) continue
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
      last = [x, y]
    }
    if (pts.length >= 3) out.push(`M${pts.join('L')}Z`)
  }
  return out.join('')
}

/** "广西壮族自治区" and "广西" have to match, so strip the administrative suffix. */
const normalise = (name) =>
  ['省', '市', '自治区', '特别行政区', '壮族', '回族', '维吾尔族', '维吾尔']
    .reduce((acc, suffix) => acc.split(suffix).join(''), name)
    .trim()

const geo = JSON.parse(readFileSync(GEO, 'utf8'))
const data = JSON.parse(readFileSync(CENTERS, 'utf8'))
const centers = Array.isArray(data) ? data : data.centers

/* Two levels of shading, because the network is wider than the list of centers we
   publish. A province with a center we name is shaded strongly; a province we reach
   only through the supply chain, a cooperative arrangement or a platform deployment
   is shaded lightly. The second set names no partner — province names only — so it
   carries no disclosure the centers file does not already make. */
const withCenter = new Set(centers.filter((c) => c.province).map((c) => normalise(c.province)))
const coverage = JSON.parse(readFileSync(COVERAGE, 'utf8'))
const served = new Set(coverage.provinces.map(normalise))
for (const p of withCenter) {
  if (!served.has(p)) throw new Error(`${p} has a center but is missing from network-coverage.json`)
}

/* The published province figure has to be the length of this roster. They were
   allowed to drift once already — facts.ts carried "25+" from a 2023 deck while
   the map shaded 23 — and a reader who counts the shaded provinces is entitled to
   get the number the page prints. */
const factsSrc = readFileSync(join(ROOT, 'src/content/facts.ts'), 'utf8')
const claimed = factsSrc.match(/'group\.provinces':\s*\{\s*value:\s*'([^']+)'/)?.[1]
if (claimed !== String(served.size)) {
  throw new Error(
    `group.provinces in facts.ts is "${claimed}" but network-coverage.json lists ${served.size}`
  )
}

const paths = geo.features
  .map((f) => {
    const d = pathFor(f.geometry)
    if (!d) return ''
    const name = normalise(f.properties?.name ?? '')
    const cls = withCenter.has(name) ? 'on' : served.has(name) ? 'reach' : 'off'
    return `<path class="${cls}" d="${d}"/>`
  })
  .join('')

/*
  No dots in the SVG. The homepage draws them from network-map-dots.json as real
  elements so they can be brought in one at a time; baking them in here too would
  show them twice.
*/
const dots = ''

/* Cities with a private hospital on the platform or served by the supply chain,
   plotted unnamed. Two gates before any of them ships:

   1. The coordinate must fall inside the province the file claims for it. A city
      guessed from a hospital's name is exactly the kind of error a map makes
      visible and a reviewer cannot catch by reading the diff.
   2. It must not sit on a center we already publish. Several of these hospitals
      ARE published centers; drawing them again would count them twice. 0.35° is
      roughly where two dots merge at this map's scale, so anything closer is the
      same dot to a reader. */
const enabled = JSON.parse(readFileSync(ENABLED, 'utf8')).cities

const provinceGeom = new Map(
  geo.features.map((f) => [normalise(f.properties?.name ?? ''), f.geometry])
)
function inProvince(lon, lat, province) {
  const geom = provinceGeom.get(normalise(province))
  if (!geom) return false
  let hit = false
  for (const ring of ringsOf(geom)) {
    let crossings = false
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i]
      const [xj, yj] = ring[j]
      if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
        crossings = !crossings
      }
    }
    if (crossings) hit = !hit
  }
  return hit
}

/* What this gate does and does not prove. It catches a coordinate that landed in
   the wrong province — the failure a city guessed from a hospital's name actually
   produces. It CANNOT catch a coordinate that is in the right province but the
   wrong city: put Guangzhou's position on the 东莞 record and this passes, because
   both are in 广东. There is no city gazetteer in the repo to check against, so
   the city column is only as good as whoever wrote it. Spot-check a new row on a
   map before committing it. */
const misplaced = enabled.filter((c) => !inProvince(c.lng, c.lat, c.province))
if (misplaced.length) {
  throw new Error(
    `network-enabled-cities.json: outside their province — ` +
      misplaced.map((c) => `${c.city} (${c.province})`).join(', ')
  )
}

const published = centers
  .filter((c) => c.coordinates)
  .map((c) => ({ ...c.coordinates, type: c.type === 'direct' ? 'direct' : 'partner' }))

/** Collapses records that sit on the same point; a self-operated centre wins over
    a partner one, so a shared coordinate never downgrades what it depicts. */
function dedupe(points) {
  const byPoint = new Map()
  for (const p of points) {
    const key = `${p.lng.toFixed(4)},${p.lat.toFixed(4)}`
    const kept = byPoint.get(key)
    if (!kept || (kept.type !== 'direct' && p.type === 'direct')) byPoint.set(key, p)
  }
  return [...byPoint.values()]
}

/* Real distance, not a bounding box. Comparing longitude and latitude
   independently makes the "radius" a square, so a point 0.382° away on the
   diagonal was being suppressed by a 0.35° rule — 平湖 was dropped against
   海宁康华医院 on exactly that. Longitude is scaled by cos(latitude) because a
   degree of longitude is shorter than a degree of latitude away from the
   equator, which is the same correction the projection above makes. */
const SUPPRESS_DEG = 0.35
function near(a, b) {
  const kx = Math.cos(((a.lat + b.lat) / 2 / 180) * Math.PI)
  const dx = (a.lng - b.lng) * kx
  const dy = a.lat - b.lat
  return Math.hypot(dx, dy) < SUPPRESS_DEG
}

const enabledPlotted = enabled.filter((c) => !published.some((p) => near(p, c)))
const publishedDots = dedupe(published)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
<style>
 /* White strokes over a filled map: the borders read as separation rather than
    as lines, which keeps a 12-province highlight legible at small sizes.
    The unshaded fill has to sit clearly apart from the page's beige — an
    off-white here made the whole map dissolve into the section background. */
 path{stroke:#ffffff;stroke-width:1.1;stroke-linejoin:round}
 path.off{fill:#e3e6ec}
 path.reach{fill:#cfe9e3}
 path.on{fill:#7ecdc0}
 circle{stroke:#fff;stroke-width:2.2}
 circle.d1{fill:#0b1d33}
 circle.d2{fill:#0b5f58}
 circle.d3{fill:#4b9c92}
</style>
${paths}
${dots}
</svg>
`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, svg, 'utf8')

/*
  The dots are written out a second time as plain coordinates, so the homepage can
  overlay them as real elements and bring them in one by one. Inlining the whole map
  to get that would put 200KB of path data in the HTML; the province shapes stay a
  static image and only the 20 dots — a few hundred bytes — become animatable.
  Same viewBox, so the two line up exactly.
*/
const DOTS_OUT = join(ROOT, 'public/data/network-map-dots.json')
writeFileSync(
  DOTS_OUT,
  JSON.stringify(
    {
      viewBox: { width: W, height: H },
      dots: [
        /* Two centers sharing a city-centre coordinate produce two dots in exactly
           the same place — invisible as duplication, but it inflates what a reader
           counts. 合肥 and 哈尔滨 each have a pair. Collapse them; the count beside
           the map comes from facts.ts, not from counting dots. */
        ...publishedDots.map((c) => {
          const [x, y] = pt(c.lng, c.lat)
          return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)), type: c.type }
        }),
        ...enabledPlotted.map((c) => {
          const [x, y] = pt(c.lng, c.lat)
          return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)), type: 'enabled' }
        }),
      ]
        /* North to south, so the sequence reads as the network spreading down the
           coast rather than as dots appearing at random. */
        .sort((a, b) => a.y - b.y),
    },
    null,
    2
  ) + '\n',
  'utf8'
)

console.log(
  `network-map.svg + network-map-dots.json  ${Math.round(svg.length / 1024)} KB  ` +
    `${withCenter.size} with centers + ${served.size - withCenter.size} served = ${served.size} provinces  ` +
    `${publishedDots.length} center dots (${published.length} centers, ${published.length - publishedDots.length} sharing a point) ` +
    `+ ${enabledPlotted.length} enabled cities ` +
    `(${enabled.length - enabledPlotted.length} suppressed as already published)`
)
console.log('  有中心：', [...withCenter].sort().join('、'))
console.log('  仅覆盖：', [...served].filter((p) => !withCenter.has(p)).sort().join('、'))
