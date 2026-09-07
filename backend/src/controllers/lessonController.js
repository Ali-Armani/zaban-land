const prisma = require('../config/prismaClient');

async function listLessons(req, res, next) {
  try {
    const { level } = req.query;
    const lessons = await prisma.lesson.findMany({
      where: level ? { level } : undefined,
      orderBy: { order: 'asc' },
    });

    // Hide Pro-only lessons' content from non-Pro users, but still show they exist.
    const isPro = req.user?.role === 'PRO' || req.user?.role === 'ADMIN';
    const result = lessons.map((l) => ({
      ...l,
      locked: l.isProOnly && !isPro,
    }));

    res.json({ lessons: result });
  } catch (err) {
    next(err);
  }
}

async function getLesson(req, res, next) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
      include: { cards: true },
    });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    const isPro = req.user?.role === 'PRO' || req.user?.role === 'ADMIN';
    if (lesson.isProOnly && !isPro) {
      return res.status(403).json({ error: 'This lesson requires a Pro subscription' });
    }

    res.json({ lesson });
  } catch (err) {
    next(err);
  }
}

module.exports = { listLessons, getLesson };
