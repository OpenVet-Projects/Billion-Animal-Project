export type OweItem = {
  number: string;
  heading: string;
  body: string;
  species: string;
};

export const OWE_ITEMS: OweItem[] = [
  {
    number: "01",
    heading: "The caretaker",
    body: "Every creature is entrusted to someone. A child with a hamster. A farmer with a herd. A rancher alone with a thousand head of cattle and no vet for two hundred miles. That person carries a life. They deserve the best medicine on Earth.",
    species: "Canine · Feline · Cunicular",
  },
  {
    number: "02",
    heading: "The animal",
    body: "An animal cannot ask for help. It cannot describe where it hurts, how long it has hurt, what changed. The medical record is its voice, the only way its history can speak across time, across vets, across borders.",
    species: "Equine · Bovine · Ovine",
  },
  {
    number: "03",
    heading: "The vet",
    body: "A vet in Jakarta and a vet in Ohio should know the same things. A breakthrough in one species should reach every species. Medicine that remembers nothing is medicine that repeats every mistake. We are building the memory.",
    species: "Porcine · Caprine · Asinine",
  },
  {
    number: "04",
    heading: "The obligation",
    body: "An animal's history is kept by whoever is in front of it, and keeping it well does not end when the visit does. What endures is pride in becoming the kind of civilization that remembers its animals.",
    species: "Gallus · Psittacine · Anatine",
  },
];
