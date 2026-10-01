import { site } from '@/lib/site';

/** Education focused structured data for rich results. */
export default function JsonLd() {
  const school = {
    '@context': 'https://schema.org',
    '@type': 'School',
    '@id': `${site.url}/#school`,
    name: site.name,
    alternateName: 'Greenfield Academy Nairobi',
    description: site.description,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/assets/images/main-slider-02.jpg`,
    slogan: site.motto,
    foundingDate: String(site.founded),
    telephone: site.phone,
    email: site.email,
    priceRange: 'KES',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'KE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: -1.3191, longitude: 36.7064 },
    areaServed: { '@type': 'City', name: 'Nairobi' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '13:00',
      },
    ],
    sameAs: site.socials.map((s) => s.href),
    numberOfStudents: 1200,
    hasCredential: ['KCSE', 'IGCSE', 'CBC'],
    department: [
      'Sciences',
      'Humanities',
      'Languages',
      'Arts and Music',
      'Technology and ICT',
      'Sports',
    ].map((name) => ({ '@type': 'EducationalOrganization', name })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '214',
      bestRating: '5',
    },
  };

  const courses = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Academic programmes at Greenfield Academy',
    itemListElement: [
      { name: 'Primary School, Grade 1 to Grade 8', description: 'CBC and Cambridge Primary pathways.' },
      { name: 'Junior Secondary, Grade 9 to Grade 10', description: 'CBC junior secondary and IGCSE foundation.' },
      { name: 'Senior Secondary, Grade 11 to Grade 12', description: 'KCSE, IGCSE and AS Level pathways.' },
    ].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: item.name,
        description: item.description,
        provider: { '@type': 'School', name: site.name, sameAs: site.url },
      },
    })),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: 'en-KE',
    publisher: { '@id': `${site.url}/#school` },
  };

  return (
    <>
      {[school, courses, website].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
