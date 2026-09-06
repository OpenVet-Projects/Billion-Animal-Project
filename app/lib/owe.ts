export type OweItem = {
  number: string;
  party: string;
  /** The line that carries the argument. Set large. */
  headline: string;
  /** One supporting line underneath. */
  body: string;
};

/**
 * The animal gets the wide panel on its own: it is the argument the rest of
 * the section supports.
 */
export const OWE_LEAD: OweItem = {
  number: "02",
  party: "The animal",
  headline:
    "An animal cannot ask for help. It cannot say where it hurts, how long it has hurt, what changed. The record is its voice.",
  body: "The only way its history can speak across time, across vets, across borders.",
};

export const OWE_ITEMS: OweItem[] = [
  {
    number: "01",
    party: "The caretaker",
    headline:
      "A rancher alone with a thousand head and no vet for two hundred miles.",
    body: "A child with a hamster. A farmer with a herd. Each one carries a life, and deserves the best medicine on Earth.",
  },
  {
    number: "03",
    party: "The vet",
    headline: "A vet in Jakarta and a vet in Ohio should know the same things.",
    body: "Medicine that remembers nothing repeats every mistake. We are building the memory.",
  },
  {
    number: "04",
    party: "The obligation",
    headline: "A civilization that remembers its animals.",
    body: "A billion animals with better medical histories, and longer, healthier lives.",
  },
];
