// Leitner spaced-repetition scheduling.
// 5 boxes; each box has a review interval. Correct -> move up a box (max 5).
// Incorrect -> reset to box 1. Interval is measured from "now" at review time.

const BOX_INTERVALS_DAYS = {
  1: 1,   // review again tomorrow
  2: 3,
  3: 7,
  4: 14,
  5: 30,
};

const MAX_BOX = 5;
const MIN_BOX = 1;

function nextBoxAndDate(currentBox, wasCorrect) {
  const nextBox = wasCorrect
    ? Math.min(currentBox + 1, MAX_BOX)
    : MIN_BOX;

  const intervalDays = BOX_INTERVALS_DAYS[nextBox];
  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);

  return { nextBox, nextReviewAt };
}

module.exports = { nextBoxAndDate, BOX_INTERVALS_DAYS };
