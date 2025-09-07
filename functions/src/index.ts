import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// XP and level constants
const LEVEL_THRESHOLDS = [0, 100, 200, 300, 420, 540, 660, 780, 900, 1020, 1110, 1200];

function computeLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

function generateCouponCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'MANUEL30-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Cloud Function to issue coupon when user reaches max progress
export const issueCouponOnMaxProgress = functions
  .region('europe-west1')
  .firestore
  .document('users/{uid}')
  .onUpdate(async (change, context) => {
    const uid = context.params.uid;
    const beforeData = change.before.data();
    const afterData = change.after.data();

    // Check if user just reached level 12 and completed all 17 lessons
    const reachedMaxLevel = beforeData.level < 12 && afterData.level >= 12;
    const completedAllLessons = afterData.completedLessonIds?.length >= 17;
    const hasMaxXp = afterData.xp >= 1200;

    if (reachedMaxLevel && completedAllLessons && hasMaxXp) {
      try {
        // Check if reward already exists
        const rewardRef = db.collection('rewards').doc(uid);
        const existingReward = await rewardRef.get();

        if (!existingReward.exists) {
          // Generate unique coupon code
          const couponCode = generateCouponCode();
          const now = admin.firestore.Timestamp.now();
          const expiresAt = admin.firestore.Timestamp.fromDate(
            new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days
          );

          // Create reward document
          await rewardRef.set({
            couponCode,
            issuedAt: now,
            expiresAt,
            redeemed: false
          });

          // Create webinar RSVP
          const webinarRef = db.collection('webinar_rsvp').doc(uid);
          await webinarRef.set({
            email: afterData.email,
            status: 'confirmed',
            issuedAt: now
          });

          // TODO: Send email notifications
          console.log(`Reward issued for user ${uid}: ${couponCode}`);
        }
      } catch (error) {
        console.error('Error issuing reward:', error);
      }
    }
  });

// Cloud Function to update user level when XP changes
export const updateUserLevel = functions
  .region('europe-west1')
  .firestore
  .document('users/{uid}')
  .onUpdate(async (change, context) => {
    const uid = context.params.uid;
    const beforeData = change.before.data();
    const afterData = change.after.data();

    // Only update if XP changed but level calculation might be wrong
    if (beforeData.xp !== afterData.xp) {
      const correctLevel = computeLevel(afterData.xp);
      
      if (afterData.level !== correctLevel) {
        try {
          await change.after.ref.update({
            level: correctLevel
          });
          console.log(`Updated level for user ${uid}: ${correctLevel}`);
        } catch (error) {
          console.error('Error updating user level:', error);
        }
      }
    }
  });

// HTTP function to compute level (for client-side validation)
export const computeLevelFunction = functions
  .region('europe-west1')
  .https
  .onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { xp } = data;
    
    if (typeof xp !== 'number' || xp < 0) {
      throw new functions.https.HttpsError('invalid-argument', 'XP must be a non-negative number');
    }

    return {
      level: computeLevel(xp),
      xp
    };
  });

// HTTP function to get user progress summary
export const getUserProgress = functions
  .region('europe-west1')
  .https
  .onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const uid = context.auth.uid;

    try {
      const userDoc = await db.collection('users').doc(uid).get();
      
      if (!userDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'User not found');
      }

      const userData = userDoc.data()!;
      const level = computeLevel(userData.xp);
      
      // Calculate badges
      const completedLessons = userData.completedLessonIds || [];
      const badges = calculateEarnedBadges(completedLessons);
      
      return {
        currentXp: userData.xp,
        currentLevel: level,
        completedLessons: completedLessons.length,
        totalLessons: 17,
        badges,
        canUnlockReward: userData.xp >= 1200 && completedLessons.length >= 17
      };
    } catch (error) {
      console.error('Error getting user progress:', error);
      throw new functions.https.HttpsError('internal', 'Error retrieving user progress');
    }
  });

// Helper function to calculate earned badges
function calculateEarnedBadges(completedLessons: string[]): string[] {
  const badges: string[] = [];
  
  // Pilier-master badge
  const pilierLessons = ['piliers-identite', 'piliers-reperes', 'piliers-echec', 'piliers-emotions', 'piliers-communiquer'];
  if (pilierLessons.every(lesson => completedLessons.includes(lesson))) {
    badges.push('pilier-master');
  }
  
  // Cognitions-master badge
  const cogLessons = ['cog-attention', 'cog-memoire', 'cog-gnosie', 'cog-praxie', 'cog-phasie'];
  if (cogLessons.every(lesson => completedLessons.includes(lesson))) {
    badges.push('cognitions-master');
  }
  
  // Self-care-OK badge
  const fardeauLessons = ['fardeau-epuisement', 'fardeau-isolement', 'fardeau-soutien'];
  if (fardeauLessons.every(lesson => completedLessons.includes(lesson))) {
    badges.push('self-care-ok');
  }
  
  // Full-Intro badge
  const introLessons = ['intro-pourquoi', 'intro-role', 'intro-offre', 'intro-utilisation'];
  if (introLessons.every(lesson => completedLessons.includes(lesson))) {
    badges.push('full-intro');
  }
  
  return badges;
}

