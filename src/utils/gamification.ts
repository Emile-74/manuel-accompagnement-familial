import { LevelInfo } from '@/types';

// XP constants
export const XP_CONSTANTS = {
  ONBOARDING: 10,
  READING: 20,
  QUIZ_SUCCESS: 30, // for score >= 80%
  CHALLENGE: 20,
  TOTAL_AVAILABLE: 1200,
  QUIZ_PASS_THRESHOLD: 80
};

// Level thresholds (cumulative XP required)
export const LEVEL_THRESHOLDS = [
  0,    // Level 1
  100,  // Level 2
  200,  // Level 3
  300,  // Level 4
  420,  // Level 5
  540,  // Level 6
  660,  // Level 7
  780,  // Level 8
  900,  // Level 9
  1020, // Level 10
  1110, // Level 11
  1200  // Level 12
];

/**
 * Calculate level from XP
 */
export function computeLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

/**
 * Get level information including XP required for current and next level
 */
export function getLevelInfo(xp: number): LevelInfo {
  const level = computeLevel(xp);
  const currentLevelXp = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextLevelXp = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  
  return {
    level,
    xpRequired: currentLevelXp,
    xpForNext: nextLevelXp
  };
}

/**
 * Calculate XP earned for a lesson completion
 */
export function calculateLessonXp(
  hasReadingTime: boolean,
  quizScore: number,
  hasChallengeAttempt: boolean
): number {
  let totalXp = 0;
  
  // Reading XP (only if minimum time spent)
  if (hasReadingTime) {
    totalXp += XP_CONSTANTS.READING;
  }
  
  // Quiz XP (only if score >= 80%)
  if (quizScore >= XP_CONSTANTS.QUIZ_PASS_THRESHOLD) {
    totalXp += XP_CONSTANTS.QUIZ_SUCCESS;
  }
  
  // Challenge XP (if at least one correct attempt)
  if (hasChallengeAttempt) {
    totalXp += XP_CONSTANTS.CHALLENGE;
  }
  
  return totalXp;
}

/**
 * Check if user can unlock final reward
 */
export function canUnlockReward(xp: number, completedLessons: number): boolean {
  return xp >= XP_CONSTANTS.TOTAL_AVAILABLE && completedLessons >= 17;
}

/**
 * Badge rules
 */
export const BADGE_RULES = {
  'pilier-master': (completedLessons: string[]) => {
    const pilierLessons = ['piliers-identite', 'piliers-reperes', 'piliers-echec', 'piliers-emotions', 'piliers-communiquer'];
    return pilierLessons.every(lesson => completedLessons.includes(lesson));
  },
  'cognitions-master': (completedLessons: string[]) => {
    const cogLessons = ['cog-attention', 'cog-memoire', 'cog-gnosie', 'cog-praxie', 'cog-phasie'];
    return cogLessons.every(lesson => completedLessons.includes(lesson));
  },
  'self-care-ok': (completedLessons: string[]) => {
    const fardeauLessons = ['fardeau-epuisement', 'fardeau-isolement', 'fardeau-soutien'];
    return fardeauLessons.every(lesson => completedLessons.includes(lesson));
  },
  'full-intro': (completedLessons: string[]) => {
    const introLessons = ['intro-pourquoi', 'intro-role', 'intro-offre', 'intro-utilisation'];
    return introLessons.every(lesson => completedLessons.includes(lesson));
  }
};

/**
 * Calculate earned badges
 */
export function calculateEarnedBadges(completedLessons: string[]): string[] {
  const earnedBadges: string[] = [];
  
  Object.entries(BADGE_RULES).forEach(([badgeId, rule]) => {
    if (rule(completedLessons)) {
      earnedBadges.push(badgeId);
    }
  });
  
  return earnedBadges;
}

