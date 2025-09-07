'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const HomePage = () => {
  return (
    <div className="bg-care-gradient min-h-screen">
      <header className="text-center py-16 px-6">
        <h1 className="text-5xl font-bold text-neutral-800 mb-4">
          Retrouvez votre souffle, guidez votre proche
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Une web-app gamifiée pour vous accompagner, aidants familiaux, à travers le handicap cognitif et la transition en EHPAD.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="mt-8">
            Commencer l'aventure
          </Button>
        </Link>
      </header>

      <main className="px-6 pb-16">
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">
            Ce que vous allez découvrir
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
              <h3 className="text-xl font-semibold text-primary-700 mb-2">
                Comprendre
              </h3>
              <p className="text-neutral-600">
                Les 5 piliers de l'accompagnement et les troubles cognitifs expliqués simplement.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
              <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                Agir
              </h3>
              <p className="text-neutral-600">
                Des outils pratiques pour gérer le quotidien, apaiser les tensions et communiquer.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
              <h3 className="text-xl font-semibold text-accent-700 mb-2">
                Prendre soin de vous
              </h3>
              <p className="text-neutral-600">
                Reconnaître le fardeau invisible et trouver les ressources pour vous préserver.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-800 mb-8">
            Commencez votre parcours
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Créez votre compte pour accéder aux 17 leçons interactives et suivre votre progression.
          </p>
          <Link href="/dashboard">
            <Button size="lg">
              Découvrir les leçons
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
