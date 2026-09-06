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

/**
 * Plain answers to the questions a person or an answer engine actually asks
 * about this page. Every claim here is also stated in the page copy.
 */
export function faqJsonLd() {
  const qa: [string, string][] = [
    [
      "What is Billion Animals?",
      "Billion Animals is an initiative of OpenVet to give animals a medical history that follows them through life, and to help medicine learn from what happens to them. The goal is a billion animals with better medical histories and longer, healthier lives.",
    ],
    [
      "Who runs Billion Animals?",
      `It is an OpenVet initiative. ${COMPANY_SENTENCE}`,
    ],
    [
      "Does one billion mean a billion records have been collected?",
      "No. It is a goal, not a count of records collected. There are two ambitions: a medical history for a billion animals, and a measurable improvement in their lives.",
    ],
    [
      "How does it begin?",
      "OpenVet helps veterinarians during care, and OpenAnimal helps owners through daily life. Together they are the start of a medical history that connects a recommendation with what happened next.",
    ],
    [
      "Why do animal medical records matter to human health?",
      "More than 6 in 10 known infectious diseases in people can spread from animals, and around 3 in 4 new or emerging ones come from animals, according to the CDC. Earlier detection in animal populations protects human ones.",
    ],
    [
      "Which animals does it cover?",
      "Companion animals, production animals, large animals, birds, aquatic species, reptiles, exotics and wildlife. Every animal is entrusted to someone.",
    ],
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
