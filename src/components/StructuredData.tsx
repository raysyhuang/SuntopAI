import Script from 'next/script'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suntopai.com'

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Suntop AI',
  alternateName: 'Suntop Healthcare Corp.',
  url: baseUrl,
  logo: `${baseUrl}/icon-512.png`,
  description: 'Leading AI-driven dialysis intelligence platform providing comprehensive smart healthcare solutions for hemodialysis centers.',
  foundingDate: '2020',
  founders: [
    {
      '@type': 'Person',
      name: 'Suntop Healthcare',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English', 'Japanese'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      availableLanguage: ['Chinese', 'English'],
    },
  ],
  sameAs: [
    // Add social media URLs here when available
  ],
}

// MedicalOrganization Schema (more specific for healthcare)
const medicalOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Suntop AI',
  url: baseUrl,
  logo: `${baseUrl}/icon-512.png`,
  description: 'AI-powered hemodialysis management platform providing intelligent clinical decision support, patient care services, and healthcare facility optimization.',
  medicalSpecialty: {
    '@type': 'MedicalSpecialty',
    name: 'Nephrology',
  },
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: 'Hemodialysis Management',
      description: 'AI-assisted hemodialysis treatment monitoring and optimization',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Vascular Access Management',
      description: 'AI-powered vascular access screening and monitoring',
    },
  ],
}

// WebSite Schema with Search Action
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Suntop AI',
  alternateName: 'Suntop Healthcare AI Platform',
  url: baseUrl,
  description: 'Smart dialysis solutions powered by AI and IoT technology',
  publisher: {
    '@type': 'Organization',
    name: 'Suntop AI',
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/icon-512.png`,
    },
  },
  inLanguage: ['zh-CN', 'en', 'ja', 'zh-TW'],
}

// Software Application Schema (for the platform)
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Suntop AI Platform',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web-based',
  description: 'Intelligent hemodialysis management platform with AI-powered clinical decision support, IoT device integration, and comprehensive patient care features.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Contact for enterprise pricing',
  },
  featureList: [
    'AI-powered clinical decision support',
    'Real-time IoT device monitoring',
    'Vascular access management',
    'Patient care coordination',
    'Multi-center management',
  ],
}

export default function StructuredData() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="medical-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalOrganizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  )
}
