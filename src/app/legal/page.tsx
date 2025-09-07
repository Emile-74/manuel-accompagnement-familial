import React from 'react';

const LegalPage = () => {
  return (
    <div className="bg-neutral-50 min-h-screen p-8">
      <main className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-soft prose lg:prose-xl">
        <h1>Mentions Légales</h1>
        
        <h2>1. Éditeur du site</h2>
        <p>Nom de l'entreprise : [Nom de votre entreprise]</p>
        <p>Adresse : [Votre adresse]</p>
        <p>Email : [Votre email]</p>
        <p>Directeur de la publication : [Votre nom]</p>

        <h2>2. Hébergement</h2>
        <p>Hébergeur : Vercel Inc.</p>
        <p>Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
        <p>Site web : vercel.com</p>

        <h2>3. Propriété intellectuelle</h2>
        <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>

        <h2>4. Données personnelles</h2>
        <p>Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant. Vous pouvez exercer ce droit en nous contactant à l'adresse email ci-dessus.</p>

        <h2>5. Cookies</h2>
        <p>Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visites. Vous pouvez vous opposer à l'enregistrement de cookies en configurant votre navigateur.</p>

        <h2>6. Limitation de responsabilité</h2>
        <p>Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, en décrivant le problème de la manière la plus précise possible.</p>
      </main>
    </div>
  );
};

export default LegalPage;

