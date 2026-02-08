import type { Center } from '@/types/center'

// Creates HTML string for Leaflet popup (always white background, use dark text)
export function createPopupContent(center: Center, locale: string = 'zh-CN'): string {
  const typeBadgeStyle = center.type === 'direct'
    ? 'background:rgba(0,125,115,0.1);color:#007d73;border:1px solid rgba(0,125,115,0.25)'
    : 'background:rgba(139,92,246,0.1);color:#7c3aed;border:1px solid rgba(139,92,246,0.25)'
  const typeLabel = center.type === 'direct' ? '直营中心' : '合作医院'

  const hasTourism = center.tourism && center.tourism.length > 0

  let html = `<div style="padding:8px;padding-right:28px;font-family:Inter,system-ui,sans-serif">`

  // Header
  html += `<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px">`
  html += `<h3 style="font-size:1rem;font-weight:600;line-height:1.3;margin:0;color:#1d1d1f">${center.name}</h3>`
  html += `<span style="padding:2px 8px;font-size:0.7rem;border-radius:9999px;white-space:nowrap;${typeBadgeStyle}">${typeLabel}</span>`
  html += `</div>`

  // Location
  html += `<div style="margin-bottom:12px">`
  html += `<div style="font-size:0.875rem;color:#6e6e73;display:flex;align-items:center;gap:4px">`
  html += `<svg width="16" height="16" fill="#9ca3af" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`
  html += `<span>${center.city}, ${center.province}</span>`
  html += `</div>`
  html += `<div style="padding-left:20px;font-size:0.75rem;color:#86868b">${center.address}</div>`
  html += `</div>`

  // Description
  if (center.description) {
    html += `<p style="font-size:0.875rem;color:#6e6e73;margin:0 0 12px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${center.description}</p>`
  }

  // Tourism indicator
  if (hasTourism) {
    html += `<div style="font-size:0.75rem;color:#007d73;display:flex;align-items:center;gap:4px;margin-bottom:12px">`
    html += `<svg width="16" height="16" fill="#007d73" viewBox="0 0 24 24"><path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/></svg>`
    html += `<span>周边旅游景点</span>`
    html += `</div>`
  }

  // Link to detail page
  if (center.type === 'direct' && center.slug) {
    html += `<a href="/${locale}/company/${center.slug}?from=map" style="font-size:0.875rem;color:#007d73;text-decoration:none;display:inline-flex;align-items:center;gap:4px;font-weight:500">`
    html += `查看详情`
    html += `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`
    html += `</a>`
  }

  // Contact
  if (center.contact) {
    html += `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #e5e7eb;font-size:0.75rem;color:#86868b">联系方式: ${center.contact}</div>`
  }

  html += `</div>`
  return html
}
