export const SITE_URL = "https://www.billionanimals.org";
export const SITE_NAME = "Billion Animals";
export const SITE_TAGLINE = "Medicine for every animal on Earth.";

/** Canon. Used verbatim in the header, the hero and the footer. */
export const ATTRIBUTION = "An OpenVet initiative.";
export const FOOTER_LINE =
  "Billion Animals is an initiative of OpenVet. Medicine for every animal on Earth.";
export const COMPANY_SENTENCE =
  "OpenVet is a comparative medical intelligence company building a living map of disease, treatment, and recovery across animal species.";

export const OPENVET_URL = "https://openvet.ai";
export const OPENANIMAL_URL = "https://openanimal.ai";
export const CONTACT_EMAIL = "hello@billionanimals.org";

export const DEFAULT_TITLE =
  "Billion Animals | Medicine for every animal on Earth";

export const DEFAULT_DESCRIPTION =
  "An OpenVet initiative for a billion animals with better medical histories and longer, healthier lives.";

export const OG_IMAGE = `${SITE_URL}/images/og.jpg`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "The Billion Animal Project",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: DEFAULT_DESCRIPTION,
    parentOrganization: {
      "@type": "Organization",
      name: "OpenVet",
      url: OPENVET_URL,
      description: COMPANY_SENTENCE,
    },
    sameAs: [OPENVET_URL, OPENANIMAL_URL],
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
      name: "OpenVet",
      url: OPENVET_URL,
    },
  };
}
