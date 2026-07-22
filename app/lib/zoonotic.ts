import { colors } from "./theme";

export type ZoonoticSpecies = {
  id: string;
  label: string;
  sub: string;
};

export type DiseaseType = "shared" | "zoonotic";

export type ZoonoticDisease = {
  id: string;
  label: string;
  stat: string;
  source: string;
  species: string[];
  type: DiseaseType;
};

export type Point = { x: number; y: number };

export type DiagramLayout = {
  w: number;
  h: number;
  species: (index: number) => Point;
  disease: (index: number) => Point;
  human: Point;
  speciesLabel: "left" | "below";
  diseaseLabel: "right" | "right-tight";
};

export const ZOONOTIC_SPECIES: ZoonoticSpecies[] = [
  { id: "canine", label: "Dog", sub: "Canine" },
  { id: "feline", label: "Cat", sub: "Feline" },
  { id: "equine", label: "Horse", sub: "Equine" },
  { id: "bovine", label: "Cattle", sub: "Bovine" },
  { id: "porcine", label: "Pig", sub: "Porcine" },
  { id: "gallus", label: "Chicken", sub: "Gallus" },
  { id: "anatine", label: "Duck", sub: "Anatine" },
  { id: "exotic", label: "Bat", sub: "Chiroptera" },
];

export const ZOONOTIC_DISEASES: ZoonoticDisease[] = [
  {
    id: "cancer",
    label: "CANCER",
    stat: "1 in 3 dogs develops cancer in their lifetime",
    source: "Same disease, same biology as human cancer",
    species: ["canine", "feline", "equine", "bovine"],
    type: "shared",
  },
  {
    id: "heart_disease",
    label: "HEART DISEASE",
    stat: "10% of all dogs have heart disease",
    source: "Shared cardiovascular biology with humans",
    species: ["canine", "feline", "equine"],
    type: "shared",
  },
  {
    id: "diabetes",
    label: "DIABETES",
    stat: "1 in 300 dogs; 1 in 230 cats",
    source: "Same insulin failure mechanism as Type 1 & 2",
    species: ["canine", "feline"],
    type: "shared",
  },
  {
    id: "influenza",
    label: "INFLUENZA",
    stat: "290,000–650,000 human deaths per year",
    source: "Originated in birds and pigs",
    species: ["porcine", "equine", "gallus", "anatine", "canine"],
    type: "zoonotic",
  },
  {
    id: "coronavirus",
    label: "CORONAVIRUS",
    stat: "COVID-19: 7+ million deaths worldwide",
    source: "Confirmed zoonotic animal origin",
    species: ["exotic", "bovine", "feline"],
    type: "zoonotic",
  },
  {
    id: "rabies",
    label: "RABIES",
    stat: "59,000 human deaths per year",
    source: "99% transmitted by dogs",
    species: ["canine", "feline", "exotic"],
    type: "zoonotic",
  },
  {
    id: "salmonella",
    label: "SALMONELLA",
    stat: "1.35 billion human cases per year",
    source: "Livestock are the primary reservoir",
    species: ["gallus", "bovine", "porcine", "anatine"],
    type: "zoonotic",
  },
  {
    id: "arthritis",
    label: "ARTHRITIS",
    stat: "80% of dogs over 8 years are affected",
    source: "Same joint degeneration as human osteoarthritis",
    species: ["canine", "feline", "equine", "bovine"],
    type: "shared",
  },
];

export const DESKTOP_LAYOUT: DiagramLayout = {
  w: 860,
  h: 600,
  species: (s) => ({
    x: 110,
    y: 60 + s * (480 / (ZOONOTIC_SPECIES.length - 1)),
  }),
  disease: (s) => ({
    x: 560,
    y: 56 + s * (488 / (ZOONOTIC_DISEASES.length - 1)),
  }),
  human: { x: 800, y: 300 },
  speciesLabel: "left",
  diseaseLabel: "right",
};

export const MOBILE_LAYOUT: DiagramLayout = {
  w: 360,
  h: 980,
  species: (s) => {
    const col = s % 4;
    const row = Math.floor(s / 4);
    return { x: 45 + col * 90, y: 64 + row * 78 };
  },
  disease: (s) => ({ x: 28, y: 310 + s * 62 }),
  human: { x: 180, y: 930 },
  speciesLabel: "below",
  diseaseLabel: "right-tight",
};

/** Contrast-safe palette for the zoonotic diagram (dark bg). */
export const zoonoticPalette = {
  bg: colors.darkBg,
  species: colors.slate,
  speciesHi: colors.textOnDark,
  shared: colors.teal,
  sharedHi: "#00d4b8",
  zoonotic: colors.blue,
  zoonoticHi: "#4d8fff",
  lineBase: "rgba(107,143,174,0.22)",
  text: colors.textOnDark,
  /** Was rgba(247,243,236,0.3) — now AA-safe muted text on dark. */
  dim: colors.textOnDarkMuted,
  soft: colors.textOnDarkSoft,
  meta: colors.textOnDarkMeta,
} as const;
