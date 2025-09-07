import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Manuel Aidant</h3>
          <p className="text-neutral-600 text-sm">Soutien et outils pour les aidants familiaux.</p>
        </div>
        <div>
          <h4 className="font-semibold text-neutral-700 mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/dashboard" className="text-neutral-600 hover:text-primary-600">Tableau de bord</Link></li>
            <li><Link href="/lessons" className="text-neutral-600 hover:text-primary-600">Toutes les leçons</Link></li>
            <li><Link href="/rewards" className="text-neutral-600 hover:text-primary-600">Mes récompenses</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-neutral-700 mb-4">Légal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/legal" className="text-neutral-600 hover:text-primary-600">Mentions Légales</Link></li>
            <li><Link href="/privacy" className="text-neutral-600 hover:text-primary-600">Politique de confidentialité</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-neutral-700 mb-4">Contact</h4>
          <p className="text-neutral-600 text-sm">contact@manuel-aidant.fr</p>
        </div>
      </div>
      <div className="bg-neutral-200 py-4">
        <p className="text-center text-xs text-neutral-500">© {new Date().getFullYear()} Manuel Aidant. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;

