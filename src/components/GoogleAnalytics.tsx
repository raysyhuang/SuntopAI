'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  // Don't render if no GA ID is configured
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Analytics utility functions for event tracking
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Common event tracking helpers
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export const trackContactFormSubmit = (formLocation: string) => {
  trackEvent('submit', 'contact_form', formLocation)
}

export const trackDownload = (fileName: string) => {
  trackEvent('download', 'file', fileName)
}

export const trackOutboundLink = (url: string) => {
  trackEvent('click', 'outbound_link', url)
}
