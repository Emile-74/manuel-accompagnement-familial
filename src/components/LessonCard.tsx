import React from 'react';
import { cn } from '@/utils/cn';
import { LessonCardProps } from '@/types';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted,
  isLocked,
  onClick
}) => {
  const getStatusIcon = () => {
    if (isCompleted) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    if (isLocked) {
      return <Lock className="w-6 h-6 text-slate-400" />;
    }
    return <PlayCircle className="w-6 h-6 text-blue-500" />;
  };

  const getStatusColor = () => {
    if (isCompleted) return 'border-green-200 bg-green-50/50';
    if (isLocked) return 'border-slate-200 bg-slate-50/50';
    return 'border-blue-200 bg-blue-50/50 hover:bg-blue-100/50';
  };

  return (
    <div
      className={cn(
        "relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer group",
        getStatusColor(),
        isLocked ? 'cursor-not-allowed opacity-60' : 'hover:shadow-lg hover:scale-[1.02]'
      )}
      onClick={!isLocked ? onClick : undefined}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        {getStatusIcon()}
      </div>

      {/* Lesson number */}
      <div className="flex items-center mb-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
          isCompleted ? 'bg-green-100 text-green-700' :
          isLocked ? 'bg-slate-100 text-slate-500' :
          'bg-blue-100 text-blue-700'
        )}>
          {lesson.order}
        </div>
        <div className="ml-3 text-xs text-slate-500 font-medium">
          Leçon {lesson.order}
        </div>
      </div>

      {/* Title */}
      <h3 className={cn(
        "text-lg font-semibold mb-3 leading-tight",
        isLocked ? 'text-slate-500' : 'text-slate-800'
      )}>
        {lesson.title}
      </h3>

      {/* Reading time */}
      <div className="flex items-center text-sm text-slate-500 mb-4">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {Math.ceil(lesson.readingTimeSec / 60)} min de lecture
      </div>

      {/* Source reference */}
      <div className="text-xs text-slate-400 mb-4">
        Source : {lesson.sourceRefs}
      </div>

      {/* Action button */}
      <div className="flex items-center justify-between">
        <div className={cn(
          "text-sm font-medium",
          isCompleted ? 'text-green-600' :
          isLocked ? 'text-slate-400' :
          'text-blue-600'
        )}>
          {isCompleted ? 'Terminé' : isLocked ? 'Verrouillé' : 'Commencer'}
        </div>
        
        {!isLocked && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      {!isLocked && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
};

