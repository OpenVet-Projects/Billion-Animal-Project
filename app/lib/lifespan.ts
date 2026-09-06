export type LifespanStep = {
  n: string;
  title: string;
  body: string;
  /** Where the step sits along the life bar, as a percentage. */
  at: number;
};

/**
 * Ordered as they happen across one life, not by number. The numbers are kept
 * so the bar and the cards can be read against each other.
 */
export const LIFESPAN_STEPS: LifespanStep[] = [
  {
    n: "05",
    title: "Earlier detection",
    body: "A value only looks wrong next to the last four. One record turns a normal result into a trend.",
    at: 8,
  },
  {
    n: "03",
    title: "Cross-species",
    body: "What is proven in sheep informs the goat, the alpaca, the yak. Most species have no evidence base of their own.",
    at: 26,
  },
  {
    n: "04",
    title: "Geography",
    body: "A record that survives the drive from a rural clinic to a referral hospital two hundred miles away.",
    at: 44,
  },
  {
    n: "01",
    title: "Major diseases",
    body: "Cancer, arthritis, heart disease, diabetes. Millions of cases show which breeds, which early signs, which intervention at which stage.",
    at: 60,
  },
  {
    n: "02",
    title: "Zoonotic defense",
    body: "A cluster in one district becomes visible while it is still a cluster in one district.",
    at: 84,
  },
];

/** Where today's recorded life ends and the argument begins, as a percentage. */
export const RECORDED_TODAY = 66;
