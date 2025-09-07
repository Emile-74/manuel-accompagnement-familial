import React from 'react';
import { cn } from '@/utils/cn';
import { BadgeListProps } from '@/types';
import { Award, Star, Heart, BookOpen } from 'lucide-react';

const BADGE_ICONS = {
  'pilier-master': Award,
  'cognitions-master': Star,
  'self-care-ok': Heart,
  'full-intro': BookOpen
};

const BADGE_COLORS = {
  'pilier-master': 'from-yellow-400 to-orange-500',
  'cognitions-master': 'from-purple-400 to-pink-500',
  'self-care-ok': 'from-green-400 to-teal-500',
  'full-intro': 'from-blue-400 to-indigo-500'
};

export const BadgeList: React.FC<BadgeListProps> = ({
  badges,
  allBadges
}) => {
  const getBadgeInfo = (badgeId: string) => {
    return allBadges.find(badge => badge.id === badgeId);
  };

  const isEarned = (badgeId: string) => {
    return badges.includes(badgeId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Vos Badges
        </h3>
        <p className="text-slate-600">
          Collectionnez les badges en complétant les différentes sections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(BADGE_ICONS).map((badgeId) => {
          const badgeInfo = getBadgeInfo(badgeId);
          const earned = isEarned(badgeId);
          const IconComponent = BADGE_ICONS[badgeId as keyof typeof BADGE_ICONS];
          const colorClass = BADGE_COLORS[badgeId as keyof typeof BADGE_COLORS];

          return (
            <div
              key={badgeId}
              className={cn(
                "relative p-6 rounded-xl border-2 transition-all duration-300",
                earned 
                  ? "border-transparent bg-gradient-to-br shadow-lg hover:shadow-xl transform hover:scale-105" 
                  : "border-slate-200 bg-slate-50 opacity-60"
              )}
              style={earned ? {
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              } : {}}
            >
              {/* Badge icon */}
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto",
                earned 
                  ? "bg-white/20 backdrop-blur-sm" 
                  : "bg-slate-200"
              )}>
                <IconComponent 
                  className={cn(
                    "w-8 h-8",
                    earned ? "text-white" : "text-slate-400"
                  )} 
                />
              </div>

              {/* Badge title */}
              <h4 className={cn(
                "text-lg font-semibold text-center mb-2",
                earned ? "text-white" : "text-slate-500"
              )}>
                {badgeInfo?.title || 'Badge'}
              </h4>

              {/* Badge description */}
              <p className={cn(
                "text-sm text-center leading-relaxed",
                earned ? "text-white/90" : "text-slate-400"
              )}>
                {badgeInfo?.rule || 'Description du badge'}
              </p>

              {/* Earned indicator */}
              {earned && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Shine effect for earned badges */}
              {earned && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress summary */}
      <div className="text-center p-4 bg-slate-50 rounded-lg">
        <div className="text-2xl font-bold text-slate-800 mb-1">
          {badges.length}/{Object.keys(BADGE_ICONS).length}
        </div>
        <div className="text-sm text-slate-600">
          Badges obtenus
        </div>
        
        {badges.length === Object.keys(BADGE_ICONS).length && (
          <div className="mt-3 p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
            <div className="text-white font-semibold">
              🎉 Félicitations ! Vous avez obtenu tous les badges !
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

