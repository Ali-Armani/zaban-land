const prisma = require('../config/prismaClient');
const { nextBoxAndDate } = require('../utils/leitner');

// Cards due for review right now, based on the Leitner schedule.
async function getDueCards(req, res, next) {
  try {
    const userId = req.user.id;
    const due = await prisma.userCardProgress.findMany({
      where: { userId, nextReviewAt: { lte: new Date() } },
      include: { card: true },
      take: 50,
    });
    res.json({ cards: due });
  } catch (err) {
    next(err);
  }
}

// Submit the result of reviewing one card; advances/resets its Leitner box.
async function submitReview(req, res, next) {
  try {
    const userId = req.user.id;
    const { cardId, correct } = req.body;

    let progress = await prisma.userCardProgress.findUnique({
      where: { userId_cardId: { userId, cardId } },
    });

    if (!progress) {
      progress = await prisma.userCardProgress.create({
        data: { userId, cardId, box: 1 },
      });
    }

    const { nextBox, nextReviewAt } = nextBoxAndDate(progress.box, Boolean(correct));

    const updated = await prisma.userCardProgress.update({
      where: { id: progress.id },
      data: { box: nextBox, nextReviewAt, lastResult: Boolean(correct) },
    });

    res.json({ progress: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDueCards, submitReview };
