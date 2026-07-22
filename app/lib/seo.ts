export const SITE_URL = "https://www.billionanimals.org";
export const SITE_NAME = "The Billion Animal Study";
export const SITE_TAGLINE =
  "Gather the medical records of one billion animals so animals live longer, healthier lives.";

export const DEFAULT_TITLE =
  "The Billion Animal Study — Animal Medical Records for Longer, Healthier Lives";

export const DEFAULT_DESCRIPTION =
  "The Billion Animal Study is building the shared memory of animal medicine: one medical record per animal, across clinics, species, and countries — so animals live longer, healthier lives.";

export const OG_IMAGE = `${SITE_URL}/images/og.jpg`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: ["Billion Animal Study", "Billion Animal Project"],
    url: SITE_URL,
    email: "hello@billionanimals.org",
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      "https://github.com/openvet-projects/billion-animal-project",
      "https://openvet.com",
    ],
    foundingDate: "2025",
    areaServed: "Worldwide",
    knowsAbout: [
      "veterinary medicine",
      "animal medical records",
      "One Health",
      "zoonotic disease",
      "comparative medicine",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
