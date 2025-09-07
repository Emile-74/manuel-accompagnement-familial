import React from 'react';
import { cn } from '@/utils/cn';
import { Star, TrendingUp, Award } from 'lucide-react';

interface XPDisplayProps {
  currentXp: number;
  currentLevel: number;
  xpForNext: number;
  className?: string;
}

export const XPDisplay: React.FC<XPDisplayProps> = ({
  currentXp,
  currentLevel,
  xpForNext,
  className
}) => {
  const xpInCurrentLevel = currentXp - (currentLevel > 1 ? getXpForLevel(currentLevel - 1) : 0);
  const xpNeededForCurrentLevel = xpForNext - (currentLevel > 1 ? getXpForLevel(currentLevel - 1) : 0);
  const progressPercentage = xpNeededForCurrentLevel > 0 ? (xpInCurrentLevel / xpNeededForCurrentLevel) * 100 : 100;

  function getXpForLevel(level: number): number {
    const thresholds = [0, 100, 200, 300, 420, 540, 660, 780, 900, 1020, 1110, 1200];
    return thresholds[level - 1] || 0;
  }

  const isMaxLevel = currentLevel >= 12;

  return (
    <div className={cn("bg-white rounded-xl shadow-lg p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Niveau {currentLevel}
            </h3>
            <p className="text-slate-600 text-sm">
              {isMaxLevel ? 'Niveau maximum atteint !' : `${xpForNext - currentXp} XP pour le niveau suivant`}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {currentXp.toLocaleString()}
          </div>
          <div className="text-sm text-slate-500">
            XP Total
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {!isMaxLevel && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">
              Progression vers le niveau {currentLevel + 1}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{xpInCurrentLevel} XP</span>
            <span>{xpNeededForCurrentLevel} XP</span>
          </div>
        </div>
      )}

      {/* XP breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-lg font-semibold text-green-700">
            {Math.floor(currentXp / 70)}
          </div>
          <div className="text-xs text-green-600">
            Leçons complètes
          </div>
        </div>

        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-lg font-semibold text-blue-700">
            {currentLevel}
          </div>
          <div className="text-xs text-blue-600">
            Niveau actuel
          </div>
        </div>

        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-lg font-semibold text-purple-700">
            {isMaxLevel ? '100' : Math.round((currentXp / 1200) * 100)}%
          </div>
          <div className="text-xs text-purple-600">
            Progression totale
          </div>
        </div>
      </div>

      {/* Level milestone */}
      {isMaxLevel && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-center">
          <div className="text-white font-bold text-lg mb-1">
            🎉 Niveau Maximum Atteint !
          </div>
          <div className="text-yellow-100 text-sm">
            Félicitations pour avoir terminé tout le parcours d'apprentissage !
          </div>
        </div>
      )}

      {/* Next level preview */}
      {!isMaxLevel && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">
                Niveau {currentLevel + 1}
              </div>
              <div className="text-sm text-slate-600">
                Débloquez de nouvelles fonctionnalités
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">
                {xpForNext - currentXp} XP restants
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

