const prisma = require('../config/prismaClient');

async function listQuizzes(req, res, next) {
  try {
    const { frequency } = req.query; // DAILY | WEEKLY | MONTHLY
    const quizzes = await prisma.quiz.findMany({
      where: frequency ? { frequency } : undefined,
      select: { id: true, title: true, frequency: true, lessonId: true },
    });
    res.json({ quizzes });
  } catch (err) {
    next(err);
  }
}

async function getQuiz(req, res, next) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: {
        questions: {
          select: { id: true, prompt: true, choices: true }, // correctIndex withheld
        },
      },
    });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json({ quiz });
  } catch (err) {
    next(err);
  }
}

async function submitQuiz(req, res, next) {
  try {
    const userId = req.user.id;
    const quizId = req.params.id;
    const { answers } = req.body; // [{ questionId, selectedIndex }]

    const questions = await prisma.quizQuestion.findMany({ where: { quizId } });
    const correctById = Object.fromEntries(questions.map((q) => [q.id, q.correctIndex]));

    let score = 0;
    for (const a of answers) {
      if (correctById[a.questionId] === a.selectedIndex) score += 1;
    }

    const attempt = await prisma.quizAttempt.create({
      data: { userId, quizId, score, total: questions.length },
    });

    res.json({ attempt });
  } catch (err) {
    next(err);
  }
}

module.exports = { listQuizzes, getQuiz, submitQuiz };
