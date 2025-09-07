import React from 'react';
import { RewardCard } from '@/components/RewardCard';

const RewardsPage = () => {
  // Mock data for demonstration
  const reward = {
    uid: 'user123',
    couponCode: 'MANUEL30-ABC123DE',
    issuedAt: new Date(),
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    redeemed: false,
  };

  const webinarRsvp = {
    uid: 'user123',
    email: 'user@example.com',
    status: 'confirmed' as const,
    issuedAt: new Date(),
  };

  return (
    <div className="bg-neutral-50 min-h-screen p-8">
      <header className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-neutral-800">Vos Récompenses</h1>
        <p className="text-lg text-neutral-600 mt-2">Félicitations pour avoir complété le parcours !</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <RewardCard reward={reward} webinarRsvp={webinarRsvp} />
      </main>
    </div>
  );
};

export default RewardsPage;

