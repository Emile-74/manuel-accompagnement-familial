const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Load lessons and quiz data
const lessonsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../lessons_content.json'), 'utf8'));
const quizData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../quiz_items.json'), 'utf8'));

// Badge definitions
const badges = [
  {
    id: 'pilier-master',
    title: 'Maître des Piliers',
    rule: 'Compléter les 5 leçons sur les piliers d\'accompagnement'
  },
  {
    id: 'cognitions-master',
    title: 'Expert Cognitif',
    rule: 'Compléter les 5 leçons sur les troubles cognitifs'
  },
  {
    id: 'self-care-ok',
    title: 'Auto-soin Maîtrisé',
    rule: 'Compléter les 3 leçons sur le fardeau de l\'aidant'
  },
  {
    id: 'full-intro',
    title: 'Introduction Complète',
    rule: 'Compléter les 4 leçons d\'introduction'
  }
];

async function seedFirestore() {
  try {
    console.log('Starting Firestore seeding...');

    // Seed lessons
    console.log('Seeding lessons...');
    const batch1 = db.batch();
    
    for (const lesson of lessonsData.lessons) {
      const lessonRef = db.collection('lessons').doc(lesson.id);
      batch1.set(lessonRef, {
        ...lesson,
        quizItemIds: quizData.quizItems
          .filter(item => item.lessonId === lesson.id)
          .map(item => item.id)
      });
    }
    
    await batch1.commit();
    console.log(`Seeded ${lessonsData.lessons.length} lessons`);

    // Seed quiz items
    console.log('Seeding quiz items...');
    const batch2 = db.batch();
    
    for (const quizItem of quizData.quizItems) {
      const quizRef = db.collection('quizItems').doc(quizItem.id);
      batch2.set(quizRef, quizItem);
    }
    
    await batch2.commit();
    console.log(`Seeded ${quizData.quizItems.length} quiz items`);

    // Seed badges
    console.log('Seeding badges...');
    const batch3 = db.batch();
    
    for (const badge of badges) {
      const badgeRef = db.collection('badges').doc(badge.id);
      batch3.set(badgeRef, badge);
    }
    
    await batch3.commit();
    console.log(`Seeded ${badges.length} badges`);

    console.log('Firestore seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Firestore:', error);
    process.exit(1);
  }
}

seedFirestore();

