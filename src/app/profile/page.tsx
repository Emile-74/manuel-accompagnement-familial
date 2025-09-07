import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-neutral-50 min-h-screen p-8">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-neutral-800">Votre Profil</h1>
      </header>

      <main className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-soft">
        <div className="space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-neutral-700">Nom d'utilisateur</label>
            <input type="text" id="displayName" defaultValue="Aidant Engagé" className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Adresse e-mail</label>
            <input type="email" id="email" defaultValue="aidant.engage@example.com" disabled className="mt-1 block w-full px-3 py-2 bg-neutral-100 border border-neutral-300 rounded-md shadow-sm" />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input id="consentMarketing" name="consentMarketing" type="checkbox" defaultChecked className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-neutral-300 rounded" />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consentMarketing" className="font-medium text-neutral-700">Recevoir les actualités et offres</label>
              <p className="text-neutral-500">Recevez des conseils supplémentaires et des offres exclusives par e-mail.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-200 space-y-4">
          <h3 className="text-lg font-semibold text-neutral-800">Gestion du compte</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">Exporter mes données</button>
            <button className="w-full sm:w-auto flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">Supprimer mon compte</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

