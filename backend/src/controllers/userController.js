const prisma = require('../config/prismaClient');

async function getMe(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true, username: true, email: true, mobile: true,
        role: true, proExpiresAt: true, createdAt: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

// Dashboard summary: cards due for review, streak-ish stats, recent quiz scores.
async function getDashboard(req, res, next) {
  try {
    const userId = req.user.id;

    const dueCount = await prisma.userCardProgress.count({
      where: { userId, nextReviewAt: { lte: new Date() } },
    });

    const recentAttempts = await prisma.quizAttempt.findMany({
      where: { userId },
      orderBy: { takenAt: 'desc' },
      take: 5,
      include: { quiz: { select: { title: true } } },
    });

    res.json({ dueForReview: dueCount, recentQuizAttempts: recentAttempts });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMe, getDashboard };
