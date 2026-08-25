import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

/**
 * Internal pricing sheet.
 *
 * Deliberately served from a route handler rather than `public/`: a file under
 * `public/` is served straight off the filesystem at `/internal_pricing.html`,
 * and Next's middleware matcher ignores any pattern containing a dot, so that
 * path could not be covered by the Basic-auth guard in `src/middleware.ts`.
 * Keeping the document outside `public/` means there is exactly one way in, and
 * middleware sits in front of it.
 */

const SHEET = join(process.cwd(), 'src', 'content', 'internal-pricing.html')

// Read once at module load so a request never touches the disk.
const html = readFileSync(SHEET, 'utf8')

export const dynamic = 'force-dynamic'

export function GET() {
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
    },
  })
}
