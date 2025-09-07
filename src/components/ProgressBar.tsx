import React from 'react';
import { cn } from '@/utils/cn';
import { ProgressBarProps } from '@/types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  className 
}) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-700">
          Progression
        </span>
        <span className="text-sm text-slate-500">
          {current}/{total}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent to-white/20 rounded-full"></div>
        </div>
      </div>
      <div className="mt-1 text-xs text-slate-500 text-center">
        {percentage.toFixed(0)}% complété
      </div>
    </div>
  );
};

