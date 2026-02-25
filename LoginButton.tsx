import React from 'react';

interface BadgeCollectionProps {
  currentStreak: number;
  milestones: bigint[];
}

const MILESTONE_BADGES = [
  { days: 3, emoji: '🌱', label: '3-Day Sprout', desc: 'Complete 3 days in a row' },
  { days: 7, emoji: '🌸', label: '7-Day Bloom', desc: 'Complete 7 days in a row' },
  { days: 14, emoji: '🌺', label: '14-Day Blossom', desc: 'Complete 14 days in a row' },
  { days: 30, emoji: '🌳', label: '30-Day Tree', desc: 'Complete 30 days in a row' },
];

export default function BadgeCollection({ currentStreak, milestones }: BadgeCollectionProps) {
  const earnedMilestones = new Set(milestones.map((m) => Number(m)));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {MILESTONE_BADGES.map((badge) => {
        const earned = earnedMilestones.has(badge.days) || currentStreak >= badge.days;
        return (
          <div
            key={badge.days}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
              earned
                ? 'bg-primary/5 border-primary/30 shadow-cute'
                : 'bg-muted/30 border-border/30 opacity-50 grayscale'
            }`}
          >
            <span className="text-3xl">{badge.emoji}</span>
            <div className="text-center">
              <p className="font-bold text-sm text-foreground">{badge.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{badge.desc}</p>
            </div>
            {earned && (
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Earned! ✨
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
