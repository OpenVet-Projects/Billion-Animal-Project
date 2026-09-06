import { colors } from "./theme";

export type LifespanTab = {
  n: string;
  title: string;
  accent: string;
  img: string;
  imgAlt: string;
  blurb: string;
  body: string;
  /** Attribution for any statistic quoted above. Empty when none is quoted. */
  source: string;
};

export const LIFESPAN_TABS: LifespanTab[] = [
  {
    n: "01",
    title: "Major diseases",
    accent: colors.blue,
    img: "/images/animals/dog.png",
    imgAlt: "Dog",
    blurb:
      "Cancer. Arthritis. Heart disease. Diabetes. Patterns read across many cases can show what a single clinic cannot see.",
    body: "Read together, a large body of cases can suggest which breeds are predisposed, which early signs are missed, which interventions help, and at what stage.",
    source: "",
  },
  {
    n: "02",
    title: "Cross-species",
    accent: colors.teal,
    img: "/images/animals/horse.png",
    imgAlt: "Horse",
    blurb:
      "What is learned in one species should be able to reach every species. Records end the silo.",
    body: "Dogs develop cancers that closely resemble human ones, which is why the National Cancer Institute runs a comparative oncology programme with veterinary clinics. When histories are shared, discovery travels.",
    source: "NCI Comparative Oncology Program",
  },
  {
    n: "03",
    title: "Zoonotic defence",
    accent: colors.blue,
    img: "/images/animals/chicken.png",
    imgAlt: "Chicken",
    blurb:
      "More than 6 in 10 known infectious diseases in people can spread from animals. Veterinary medicine is a first line of defence.",
    body: "Around 3 in 4 new or emerging infectious diseases in people come from animals. Earlier detection in animal populations protects human ones.",
    source: "CDC, One Health: Zoonotic Diseases",
  },
  {
    n: "04",
    title: "Geography",
    accent: colors.teal,
    img: "/images/animals/camel.png",
    imgAlt: "Camel",
    blurb:
      "A protocol that works in Japan should not be invisible in Eastern Europe. Knowledge should ignore borders.",
    body: "Parasites, nutrition, treatment: what works should be able to travel, regardless of where it was first written down.",
    source: "",
  },
  {
    n: "05",
    title: "Earlier detection",
    accent: colors.blue,
    img: "/images/animals/cat.png",
    imgAlt: "Cat",
    blurb:
      "A continuous record creates a baseline. Deviation caught early is disease caught early.",
    body: "Most animals are seen when they are already sick. Anticipatory medicine starts with a memory that does not reset at every clinic door.",
    source: "",
  },
];
