import React from 'react';
import Timer from '../components/Timer';

export default function TimerPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Decorative header */}
      <div className="text-center mb-6">
        <h1 className="font-pacifico text-3xl text-primary mb-1">Focus Time! 🌸</h1>
        <p className="text-sm text-muted-foreground font-medium">
          One Pomodoro at a time, you're blooming! ✨
        </p>
      </div>

      {/* Timer Card */}
      <div className="w-full max-w-md bg-card rounded-3xl shadow-cute-lg border border-border/50 p-6 sm:p-8">
        <Timer />
      </div>
    </div>
  );
}
