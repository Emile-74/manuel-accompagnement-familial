import React from 'react';
import { QuizRunner } from '@/components/QuizRunner';
import { lessons } from '@/data/lessons'; // Mock data
import { quizItems } from '@/data/quizItems'; // Mock data

const LessonPage = ({ params }: { params: { slug: string } }) => {
  const lesson = lessons.find(l => l.slug === params.slug);
  const lessonQuizItems = quizItems.filter(q => q.lessonId === lesson?.id);

  if (!lesson) {
    return <div>Leçon non trouvée</div>;
  }

  return (
    <div className="bg-neutral-50 min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <article className="prose lg:prose-xl mb-12">
          <h1>{lesson.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: lesson.htmlContent }} />
        </article>

        <section>
          <h2 className="text-3xl font-bold text-neutral-800 mb-6 text-center">Testez vos connaissances</h2>
          <QuizRunner quizItems={lessonQuizItems} onComplete={(score) => console.log(`Quiz terminé avec un score de ${score}%`)} />
        </section>
      </main>
    </div>
  );
};

export default LessonPage;

