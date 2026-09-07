const prisma = require('../config/prismaClient');

async function listUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, mobile: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    res.json({ users });
  } catch (err) {
    next(err);
  }
}

async function createLesson(req, res, next) {
  try {
    const { title, description, level, order, isProOnly } = req.body;
    const lesson = await prisma.lesson.create({
      data: { title, description, level, order: order || 0, isProOnly: Boolean(isProOnly) },
    });
    res.status(201).json({ lesson });
  } catch (err) {
    next(err);
  }
}

async function addCardToLesson(req, res, next) {
  try {
    const { lessonId } = req.params;
    const { type, term, definition, example } = req.body;
    const card = await prisma.card.create({
      data: { lessonId, type, term, definition, example },
    });
    res.status(201).json({ card });
  } catch (err) {
    next(err);
  }
}

async function getAnalytics(req, res, next) {
  try {
    const [userCount, proCount, lessonCount, quizAttemptCount] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'PRO' } }),
      prisma.lesson.count(),
      prisma.quizAttempt.count(),
    ]);
    res.json({ userCount, proCount, lessonCount, quizAttemptCount });
  } catch (err) {
    next(err);
  }
}

module.exports = { listUsers, createLesson, addCardToLesson, getAnalytics };
