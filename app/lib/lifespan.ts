import { colors } from "./theme";

export type LifespanTab = {
  n: string;
  title: string;
  accent: string;
  img: string;
  imgAlt: string;
  blurb: string;
  body: string;
};

export const LIFESPAN_TABS: LifespanTab[] = [
  {
    n: "01",
    title: "MAJOR DISEASES",
    accent: colors.blue,
    img: "/images/animals/dog.png",
    imgAlt: "Dog",
    blurb:
      "Cancer. Arthritis. Heart disease. Diabetes. Pattern recognition at scale finds what one clinic cannot.",
    body: "A platform that aggregates millions of cases can identify which breeds are predisposed, which early signs are missed, which interventions work, and at what stage.",
  },
  {
    n: "02",
    title: "CROSS-SPECIES",
    accent: colors.teal,
    img: "/images/animals/horse.png",
    imgAlt: "Horse",
    blurb:
      "A breakthrough in one species should reach every species. Records end the silo.",
    body: "Canine oncology informed human medicine. Equine joint research reshaped bovine mobility. When records are shared, discovery travels.",
  },
  {
    n: "03",
    title: "ZOONOTIC DEFENSE",
    accent: colors.blue,
    img: "/images/animals/chicken.png",
    imgAlt: "Chicken",
    blurb:
      "6 in 10 infectious human diseases can spread from animals. Veterinary medicine is the first line.",
    body: "Every modern pandemic has an animal origin. Earlier detection in animal populations protects human ones.",
  },
  {
    n: "04",
    title: "GEOGRAPHY",
    accent: colors.teal,
    img: "/images/animals/camel.png",
    imgAlt: "Camel",
    blurb:
      "A protocol in Japan should not be invisible in Eastern Europe. Knowledge should ignore borders.",
    body: "We route what works, including parasites, nutrition, and treatments, regardless of where it originated.",
  },
  {
    n: "05",
    title: "EARLIER DETECTION",
    accent: colors.blue,
    img: "/images/animals/cat.png",
    imgAlt: "Cat",
    blurb:
      "A continuous record creates a baseline. Deviation caught early is disease caught early.",
    body: "Most animals present when already sick. Anticipatory medicine starts with memory that does not reset at every clinic door.",
  },
];
