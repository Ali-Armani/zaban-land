// Optional: seed a little sample content so the app isn't empty on first run.
// Run with: npm run seed
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lesson = await prisma.lesson.create({
    data: {
      title: 'Everyday Greetings',
      description: 'Basic greetings and introductions for beginners',
      level: 'BEGINNER',
      order: 1,
      cards: {
        create: [
          { type: 'VOCABULARY', term: 'Hello', definition: 'A greeting used when meeting someone', example: 'Hello, how are you?' },
          { type: 'VOCABULARY', term: 'Goodbye', definition: 'Said when leaving or ending a conversation', example: 'Goodbye, see you tomorrow!' },
          { type: 'IDIOM', term: 'Break the ice', definition: 'To make people feel more comfortable', example: 'He told a joke to break the ice.' },
        ],
      },
    },
  });

  console.log('Seeded lesson:', lesson.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
