import React, { useState, useEffect, useRef } from 'react';
import { useTimer, TimerMode } from '../hooks/useTimer';
import { useSaveSession } from '../hooks/useQueries';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { playSound } from '../utils/audio';
import { formatCountdown } from '../utils/dateHelpers';
import StreakBadge from './StreakBadge';
import RewardAnimation from './RewardAnimation';
import BreakSettings from './BreakSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Settings2,
  Pencil,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const MODE_LABELS: Record<TimerMode, { label: string; emoji: string; color: string }> = {
  focus: { label: 'Focus Time', emoji: '🍅', color: 'timer-ring-focus' },
  shortBreak: { label: 'Short Break', emoji: '☕', color: 'timer-ring-break' },
  longBreak: { label: 'Long Break', emoji: '🛋️', color: 'timer-ring-long-break' },
};

const CIRCUMFERENCE = 2 * Math.PI * 110; // r=110

export default function Timer() {
  const { data: profile } = useGetCallerUserProfile();
  const saveSession = useSaveSession();
  const [taskName, setTaskName] = useState('');
  const [editingTask, setEditingTask] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [lastCompletedTask, setLastCompletedTask] = useState('');
  const [lastBreakDuration, setLastBreakDuration] = useState(5);
  const taskInputRef = useRef<HTMLInputElement>(null);

  const handleFocusComplete = (focusDuration: number, breakDuration: number) => {
    const sound = profile?.soundProfile?.sound ?? 'chime';
    const volume = Number(profile?.soundProfile?.volume ?? 70);
    playSound(sound, volume);
    setLastCompletedTask(taskName);
    setLastBreakDuration(breakDuration);
    setShowReward(true);
    saveSession.mutate({ taskName: taskName || 'Untitled session', focusDuration, breakDuration });
  };

  const timer = useTimer(handleFocusComplete);
  const modeInfo = MODE_LABELS[timer.mode];

  const strokeDashoffset = CIRCUMFERENCE * (1 - timer.progress);

  const ringColorMap: Record<TimerMode, string> = {
    focus: 'oklch(var(--timer-focus))',
    shortBreak: 'oklch(var(--timer-break))',
    longBreak: 'oklch(var(--timer-long-break))',
  };

  const ringColor = ringColorMap[timer.mode];

  const handleDismissReward = () => {
    setShowReward(false);
    setTaskName('');
  };

  useEffect(() => {
    if (editingTask && taskInputRef.current) {
      taskInputRef.current.focus();
    }
  }, [editingTask]);

  const streak = Number(profile?.streak?.currentStreak ?? 0);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Mode Indicator */}
      <div className="flex gap-2">
        {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
          <div
            key={m}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              timer.mode === m
                ? 'bg-primary text-primary-foreground shadow-cute'
                : 'bg-muted/50 text-muted-foreground'
            }`}
          >
            {MODE_LABELS[m].emoji} {MODE_LABELS[m].label}
          </div>
        ))}
      </div>

      {/* Circular Timer */}
      <div className="relative flex items-center justify-center">
        {/* Pulse ring */}
        {timer.isRunning && (
          <div
            className="absolute rounded-full animate-pulse-ring"
            style={{
              width: 260,
              height: 260,
              border: `3px solid ${ringColor}`,
              opacity: 0.3,
            }}
          />
        )}

        <svg width="260" height="260" className="-rotate-90">
          {/* Background ring */}
          <circle
            cx="130"
            cy="130"
            r="110"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted/40"
          />
          {/* Progress ring */}
          <circle
            cx="130"
            cy="130"
            r="110"
            fill="none"
            stroke={ringColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center gap-1">
          <span className="text-3xl">{modeInfo.emoji}</span>
          <span className="font-pacifico text-5xl text-foreground tabular-nums">
            {formatCountdown(timer.secondsLeft)}
          </span>
          <span className="text-sm font-bold text-muted-foreground">{modeInfo.label}</span>
          <span className="text-xs text-muted-foreground">
            #{timer.completedPomodoros + 1}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="w-11 h-11 rounded-full"
          onClick={timer.reset}
          title="Reset"
        >
          <RotateCcw size={18} />
        </Button>

        <Button
          size="lg"
          className="w-20 h-20 rounded-full shadow-cute-lg text-2xl font-bold"
          onClick={timer.isRunning ? timer.pause : timer.start}
        >
          {timer.isRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="w-11 h-11 rounded-full"
          onClick={timer.skipToNext}
          title="Skip"
        >
          <SkipForward size={18} />
        </Button>
      </div>

      {/* Pomodoro dots */}
      <div className="flex gap-2 items-center">
        {Array.from({ length: timer.config.longBreakInterval }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < timer.completedPomodoros % timer.config.longBreakInterval
                ? 'bg-primary scale-110'
                : 'bg-muted/60'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          {timer.completedPomodoros} done
        </span>
      </div>

      {/* Task Input */}
      <div className="w-full max-w-sm">
        <div className="relative">
          {editingTask ? (
            <Input
              ref={taskInputRef}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onBlur={() => setEditingTask(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingTask(false)}
              placeholder="What are you working on? 🌸"
              className="rounded-2xl border-primary/40 focus:border-primary pr-10 font-nunito text-center"
            />
          ) : (
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground group"
              onClick={() => setEditingTask(true)}
            >
              <Pencil size={14} className="group-hover:text-primary transition-colors" />
              {taskName || 'What are you working on? ✏️'}
            </button>
          )}
        </div>
      </div>

      {/* Streak + Settings Row */}
      <div className="flex items-center justify-between w-full max-w-sm">
        <StreakBadge streak={streak} size="sm" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full gap-1 text-muted-foreground">
              <Settings2 size={15} />
              Timer Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 rounded-3xl p-4 shadow-cute-xl border-border/50">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <Settings2 size={15} className="text-primary" />
              Timer Settings
            </h3>
            <BreakSettings config={timer.config} onUpdate={timer.updateConfig} />
          </PopoverContent>
        </Popover>
      </div>

      {/* Reward Animation */}
      {showReward && (
        <RewardAnimation
          onDismiss={handleDismissReward}
          taskName={lastCompletedTask}
        />
      )}
    </div>
  );
}
