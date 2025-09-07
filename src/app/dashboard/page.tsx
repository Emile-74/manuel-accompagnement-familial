'use client';

import React from 'react';
import { XPDisplay } from '@/components/XPDisplay';
import { BadgeList } from '@/components/BadgeList';
import { LessonCard } from '@/components/LessonCard';
import { lessons } from '@/data/lessons'; // Mock data
import { badges } from '@/data/badges'; // Mock data

const DashboardPage = () => {
  // Mock data for demonstration
  const userProgress = {
    currentXp: 450,
    currentLevel: 5,
    xpForNext: 540,
    completedLessons: ['intro-pourquoi', 'intro-role', 'intro-offre'],
    earnedBadges: ['full-intro'],
  };

  return (
    <div className="bg-neutral-50 min-h-screen p-8">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-neutral-800">Votre Tableau de Bord</h1>
        <p className="text-lg text-neutral-600 mt-2">Suivez votre progression, vos badges et les prochaines leçons.</p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <XPDisplay 
            currentXp={userProgress.currentXp} 
            currentLevel={userProgress.currentLevel} 
            xpForNext={userProgress.xpForNext} 
          />

          <section>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Prochaines Leçons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {lessons.slice(3, 5).map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={false} 
                  isLocked={false} 
                  onClick={() => {}} 
                />
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <BadgeList badges={userProgress.earnedBadges} allBadges={badges} />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

