import React from 'react';
import { Flame, Star } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StreakBadge({ streak, size = 'md' }: StreakBadgeProps) {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1 gap-1',
    md: 'text-base px-3 py-1.5 gap-1.5',
    lg: 'text-lg px-4 py-2 gap-2',
  };

  const iconSizes = { sm: 14, md: 18, lg: 22 };

  const isHot = streak >= 7;
  const isMilestone = streak > 0 && [3, 7, 14, 30].includes(streak);

  return (
    <div
      className={`inline-flex items-center rounded-full font-bold ${sizeClasses[size]} ${
        streak === 0
          ? 'bg-muted text-muted-foreground'
          : isHot
          ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
          : 'bg-primary/10 text-primary'
      } ${isMilestone ? 'ring-2 ring-primary/40' : ''}`}
    >
      {streak >= 3 ? (
        <Flame size={iconSizes[size]} className={isHot ? 'text-orange-500' : 'text-primary'} />
      ) : (
        <Star size={iconSizes[size]} className="text-yellow-500" />
      )}
      <span>{streak}</span>
      <span className="font-normal opacity-70 text-xs">
        {streak === 1 ? 'day' : 'days'}
      </span>
    </div>
  );
}
