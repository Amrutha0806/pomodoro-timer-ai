import { useState, useEffect, useRef, useCallback } from 'react';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerConfig {
  focusDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  longBreakInterval: number; // every N pomodoros
}

export interface TimerState {
  mode: TimerMode;
  secondsLeft: number;
  isRunning: boolean;
  completedPomodoros: number;
  config: TimerConfig;
}

const DEFAULT_CONFIG: TimerConfig = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
};

function getDurationSeconds(mode: TimerMode, config: TimerConfig): number {
  switch (mode) {
    case 'focus': return config.focusDuration * 60;
    case 'shortBreak': return config.shortBreakDuration * 60;
    case 'longBreak': return config.longBreakDuration * 60;
  }
}

export function useTimer(onFocusComplete?: (focusDuration: number, breakDuration: number) => void) {
  const [config, setConfig] = useState<TimerConfig>(DEFAULT_CONFIG);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_CONFIG.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onFocusComplete);
  onCompleteRef.current = onFocusComplete;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsRunning(false);

          // Handle completion
          if (mode === 'focus') {
            const newCount = completedPomodoros + 1;
            setCompletedPomodoros(newCount);
            const nextMode: TimerMode =
              newCount % config.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
            const breakDuration =
              nextMode === 'longBreak' ? config.longBreakDuration : config.shortBreakDuration;
            onCompleteRef.current?.(config.focusDuration, breakDuration);
            setMode(nextMode);
            return getDurationSeconds(nextMode, config);
          } else {
            setMode('focus');
            return getDurationSeconds('focus', config);
          }
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, mode, completedPomodoros, config, clearTimer]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(getDurationSeconds(mode, config));
  }, [mode, config]);

  const skipToNext = useCallback(() => {
    setIsRunning(false);
    if (mode === 'focus') {
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);
      const nextMode: TimerMode =
        newCount % config.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setSecondsLeft(getDurationSeconds(nextMode, config));
    } else {
      setMode('focus');
      setSecondsLeft(getDurationSeconds('focus', config));
    }
  }, [mode, completedPomodoros, config]);

  const updateConfig = useCallback((newConfig: Partial<TimerConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      setSecondsLeft(getDurationSeconds(mode, updated));
      return updated;
    });
    setIsRunning(false);
  }, [mode]);

  const totalSeconds = getDurationSeconds(mode, config);
  const progress = 1 - secondsLeft / totalSeconds;

  return {
    mode,
    secondsLeft,
    isRunning,
    completedPomodoros,
    config,
    progress,
    totalSeconds,
    start,
    pause,
    reset,
    skipToNext,
    updateConfig,
  };
}
