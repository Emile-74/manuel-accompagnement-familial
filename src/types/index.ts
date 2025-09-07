// User types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  xp: number;
  level: number;
  completedLessonIds: string[];
  consentMarketing: boolean;
}

// Lesson types
export interface Lesson {
  id: string;
  title: string;
  slug: string;
  order: number;
  sourceRefs: string;
  htmlContent: string;
  readingTimeSec: number;
  quizItemIds: string[];
}

// Quiz types
export type QuizItemType = 'mcq' | 'tf' | 'cloze';

export interface QuizItem {
  id: string;
  type: QuizItemType;
  stem: string;
  options: string[];
  correctAnswers: number[] | string[];
  explanation: string;
  lessonId: string;
}

// Attempt types
export interface Attempt {
  id: string;
  uid: string;
  lessonId: string;
  scorePct: number;
  earnedXp: number;
  completedAt: Date;
}

// Badge types
export interface Badge {
  id: string;
  title: string;
  rule: string;
}

// Reward types
export interface Reward {
  uid: string;
  couponCode: string;
  issuedAt: Date;
  expiresAt: Date;
  redeemed: boolean;
}

// Webinar RSVP types
export interface WebinarRSVP {
  uid: string;
  email: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  issuedAt: Date;
}

// Gamification types
export interface LevelInfo {
  level: number;
  xpRequired: number;
  xpForNext: number;
}

export interface ProgressInfo {
  currentXp: number;
  currentLevel: number;
  completedLessons: number;
  totalLessons: number;
  badges: string[];
  canUnlockReward: boolean;
}

// Component props types
export interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isLocked: boolean;
  onClick: () => void;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export interface QuizRunnerProps {
  quizItems: QuizItem[];
  onComplete: (score: number) => void;
}

export interface BadgeListProps {
  badges: string[];
  allBadges: Badge[];
}

export interface RewardCardProps {
  reward: Reward | null;
  webinarRsvp: WebinarRSVP | null;
}

