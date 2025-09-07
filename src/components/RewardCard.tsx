'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { RewardCardProps } from '@/types';
import { Gift, Calendar, Copy, Check, ExternalLink } from 'lucide-react';

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  webinarRsvp
}) => {
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleCopyCoupon = async () => {
    if (reward?.couponCode) {
      try {
        await navigator.clipboard.writeText(reward.couponCode);
        setCopiedCoupon(true);
        setTimeout(() => setCopiedCoupon(false), 2000);
      } catch (err) {
        console.error('Failed to copy coupon code:', err);
      }
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isExpired = (timestamp: any) => {
    if (!timestamp) return false;
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date < new Date();
  };

  if (!reward && !webinarRsvp) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
          <Gift className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-3">
          Récompenses à débloquer
        </h3>
        <p className="text-slate-600 mb-6">
          Atteignez le niveau 12 et complétez les 17 leçons pour débloquer vos récompenses exclusives !
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <Gift className="w-8 h-8 text-purple-500 mb-2" />
            <h4 className="font-semibold text-purple-800">Code promo -30%</h4>
            <p className="text-sm text-purple-600">Sur le manuel complet</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <Calendar className="w-8 h-8 text-blue-500 mb-2" />
            <h4 className="font-semibold text-blue-800">Webinaire exclusif</h4>
            <p className="text-sm text-blue-600">Avec les experts</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          🎉 Félicitations !
        </h2>
        <p className="text-slate-600">
          Vous avez débloqué vos récompenses exclusives
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coupon Card */}
        {reward && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-90"></div>
            <div className="relative p-8 text-white">
              <div className="flex items-center mb-6">
                <Gift className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Code Promo -30%</h3>
              </div>

              <div className="mb-6">
                <p className="text-purple-100 mb-4">
                  Votre code de réduction exclusif pour le manuel complet
                </p>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold tracking-wider">
                      {reward.couponCode}
                    </span>
                    <button
                      onClick={handleCopyCoupon}
                      className="flex items-center px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      {copiedCoupon ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copier
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-sm text-purple-100">
                  <p className="mb-1">
                    <strong>Valable jusqu'au :</strong> {formatDate(reward.expiresAt)}
                  </p>
                  <p className={cn(
                    "font-semibold",
                    isExpired(reward.expiresAt) ? "text-red-200" : "text-green-200"
                  )}>
                    {isExpired(reward.expiresAt) ? "⚠️ Expiré" : "✅ Actif"}
                  </p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
                <ExternalLink className="w-4 h-4 mr-2" />
                Utiliser le code
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rounded-full"></div>
          </div>
        )}

        {/* Webinar Card */}
        {webinarRsvp && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90"></div>
            <div className="relative p-8 text-white">
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Webinaire Exclusif</h3>
              </div>

              <div className="mb-6">
                <p className="text-blue-100 mb-4">
                  Vous êtes inscrit(e) au webinaire réservé aux aidants accomplis
                </p>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-2">
                    "Techniques avancées d'accompagnement"
                  </h4>
                  <div className="text-sm text-blue-100 space-y-1">
                    <p><strong>Date :</strong> [Date à définir]</p>
                    <p><strong>Heure :</strong> [Heure à définir]</p>
                    <p><strong>Durée :</strong> 90 minutes</p>
                    <p><strong>Format :</strong> Visioconférence</p>
                  </div>
                </div>

                <div className="text-sm text-blue-100">
                  <p className="mb-1">
                    <strong>Statut :</strong> 
                    <span className={cn(
                      "ml-2 px-2 py-1 rounded-full text-xs font-semibold",
                      webinarRsvp.status === 'confirmed' ? "bg-green-500/20 text-green-200" :
                      webinarRsvp.status === 'pending' ? "bg-yellow-500/20 text-yellow-200" :
                      "bg-red-500/20 text-red-200"
                    )}>
                      {webinarRsvp.status === 'confirmed' ? '✅ Confirmé' :
                       webinarRsvp.status === 'pending' ? '⏳ En attente' :
                       '❌ Annulé'}
                    </span>
                  </p>
                  <p>
                    <strong>Inscrit le :</strong> {formatDate(webinarRsvp.issuedAt)}
                  </p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                Ajouter au calendrier
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Additional info */}
      <div className="bg-slate-50 rounded-xl p-6 text-center">
        <h4 className="font-semibold text-slate-800 mb-2">
          🌟 Vous avez terminé votre parcours avec brio !
        </h4>
        <p className="text-slate-600">
          Ces récompenses reconnaissent votre engagement exceptionnel dans l'apprentissage 
          des techniques d'accompagnement familial. Continuez à prendre soin de vous et de votre proche.
        </p>
      </div>
    </div>
  );
};

