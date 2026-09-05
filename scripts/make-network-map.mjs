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

const covered = new Set(centers.filter((c) => c.province).map((c) => normalise(c.province)))

const paths = geo.features
  .map((f) => {
    const d = pathFor(f.geometry)
    if (!d) return ''
    const cls = covered.has(normalise(f.properties?.name ?? '')) ? 'on' : 'off'
    return `<path class="${cls}" d="${d}"/>`
  })
  .join('')

const dots = centers
  .filter((c) => c.coordinates)
  .map((c) => {
    const [x, y] = pt(c.coordinates.lng, c.coordinates.lat)
    return `<circle class="${c.type === 'direct' ? 'd1' : 'd2'}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5"/>`
  })
  .join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
<style>
 /* White strokes over a filled map: the borders read as separation rather than
    as lines, which keeps a 12-province highlight legible at small sizes.
    The unshaded fill has to sit clearly apart from the page's beige — an
    off-white here made the whole map dissolve into the section background. */
 path{stroke:#ffffff;stroke-width:1.1;stroke-linejoin:round}
 path.off{fill:#e3e6ec}
 path.on{fill:#7ecdc0}
 circle{stroke:#fff;stroke-width:2.2}
 circle.d1{fill:#0b1d33}
 circle.d2{fill:#0b5f58}
</style>
${paths}
${dots}
</svg>
`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, svg, 'utf8')

console.log(
  `network-map.svg  ${Math.round(svg.length / 1024)} KB  ` +
    `${covered.size} provinces shaded  ${centers.filter((c) => c.coordinates).length} centers plotted`
)
console.log([...covered].sort().join('、'))
