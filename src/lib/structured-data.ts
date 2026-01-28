/**
 * JSON-LD structured data for SEO
 * Helps search engines understand your content better
 */

import { Product } from '@/types';
import { BUSINESS, SEO } from './constants';

/**
 * Organization schema for the business
 */
export function getOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://studiofurniture.demo';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS.NAME,
    description: SEO.DEFAULT_DESCRIPTION,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    email: BUSINESS.EMAIL,
    telephone: BUSINESS.PHONE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.ADDRESS.STREET,
      addressLocality: BUSINESS.ADDRESS.CITY,
      addressRegion: BUSINESS.ADDRESS.STATE,
      postalCode: BUSINESS.ADDRESS.ZIP,
      addressCountry: BUSINESS.ADDRESS.COUNTRY,
    },
    sameAs: [
      `https://twitter.com/${BUSINESS.SOCIAL.TWITTER.replace('@', '')}`,
      `https://instagram.com/${BUSINESS.SOCIAL.INSTAGRAM.replace('@', '')}`,
      `https://facebook.com/${BUSINESS.SOCIAL.FACEBOOK}`,
    ],
  };
}

/**
 * Website schema for the homepage
 */
export function getWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://studiofurniture.demo';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS.NAME,
    url: baseUrl,
    description: SEO.DEFAULT_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/shop?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Product schema for individual product pages
 */
export function getProductSchema(product: Product) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://studiofurniture.demo';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: BUSINESS.NAME,
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/shop/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: BUSINESS.NAME,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Material',
        value: product.specifications.material,
      },
      {
        '@type': 'PropertyValue',
        name: 'Color',
        value: product.specifications.color,
      },
      {
        '@type': 'PropertyValue',
        name: 'Dimensions',
        value: product.specifications.dimensions,
      },
    ],
  };
}

/**
 * Breadcrumb list schema for navigation
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQ schema for about/contact pages
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * ItemList schema for product collections
 */
export function getItemListSchema(products: Product[], listName: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://studiofurniture.demo';

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${baseUrl}/shop/${product.slug}`,
      name: product.name,
      image: product.images[0],
    })),
  };
}

/**
 * Local business schema for physical stores
 */
export function getLocalBusinessSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://studiofurniture.demo';

  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: BUSINESS.NAME,
    description: SEO.DEFAULT_DESCRIPTION,
    url: baseUrl,
    telephone: BUSINESS.PHONE,
    email: BUSINESS.EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.ADDRESS.STREET,
      addressLocality: BUSINESS.ADDRESS.CITY,
      addressRegion: BUSINESS.ADDRESS.STATE,
      postalCode: BUSINESS.ADDRESS.ZIP,
      addressCountry: BUSINESS.ADDRESS.COUNTRY,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.7749', // Update with actual coordinates
      longitude: '-122.4194',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
  };
}
