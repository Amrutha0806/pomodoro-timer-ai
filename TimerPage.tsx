import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getRandomMessage } from '../data/motivationalMessages';
import { X } from 'lucide-react';

interface RewardAnimationProps {
  onDismiss: () => void;
  taskName?: string;
}

interface Confetti {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: 'circle' | 'square' | 'star';
}

const CONFETTI_COLORS = ['#f9a8d4', '#86efac', '#c4b5fd', '#fde68a', '#93c5fd', '#fca5a5', '#6ee7b7'];

function generateConfetti(count: number): Confetti[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    size: 6 + Math.random() * 8,
    shape: (['circle', 'square', 'star'] as const)[Math.floor(Math.random() * 3)],
  }));
}

export default function RewardAnimation({ onDismiss, taskName }: RewardAnimationProps) {
  const [revealed, setRevealed] = useState(false);
  const [message] = useState(getRandomMessage);
  const [confetti] = useState(() => generateConfetti(40));

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onDismiss}
      />

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute top-0"
            style={{
              left: `${c.left}%`,
              animation: `confetti-fall ${c.duration}s ${c.delay}s ease-in forwards`,
            }}
          >
            {c.shape === 'circle' && (
              <div
                style={{
                  width: c.size,
                  height: c.size,
                  borderRadius: '50%',
                  backgroundColor: c.color,
                }}
              />
            )}
            {c.shape === 'square' && (
              <div
                style={{
                  width: c.size,
                  height: c.size,
                  backgroundColor: c.color,
                  transform: 'rotate(45deg)',
                }}
              />
            )}
            {c.shape === 'star' && (
              <div style={{ color: c.color, fontSize: c.size + 4 }}>★</div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Card */}
      <div className="relative z-10 bg-card rounded-3xl shadow-cute-xl border border-border/50 p-8 max-w-sm w-full mx-4 text-center animate-slide-up">
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        {/* Sparkles */}
        <div className="absolute -top-3 -left-3 text-2xl animate-sparkle" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute -top-2 -right-4 text-xl animate-sparkle" style={{ animationDelay: '0.4s' }}>⭐</div>
        <div className="absolute -bottom-2 -left-4 text-xl animate-sparkle" style={{ animationDelay: '0.8s' }}>🌟</div>

        <h2 className="font-pacifico text-2xl text-primary mb-2">
          Session Complete!
        </h2>

        {taskName && (
          <p className="text-sm text-muted-foreground mb-4 font-nunito">
            You finished: <span className="font-bold text-foreground">"{taskName}"</span>
          </p>
        )}

        {/* Gift Box */}
        <div
          className="relative mx-auto mb-4 cursor-pointer select-none"
          style={{ width: 140, height: 140 }}
          onClick={() => setRevealed(true)}
        >
          <img
            src="/assets/generated/gift-box-reward.dim_400x400.png"
            alt="Gift reward"
            className={`w-full h-full object-contain transition-all duration-500 ${
              revealed ? 'scale-110' : 'animate-gift-bounce'
            }`}
          />
          {!revealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full animate-pulse">
                Tap me! 🎁
              </span>
            </div>
          )}
        </div>

        {/* Message */}
        {revealed && (
          <div className="animate-slide-up bg-primary/5 rounded-2xl p-4 mb-4">
            <div className="text-3xl mb-2">{message.emoji}</div>
            <p className="font-bold text-lg text-foreground">{message.text}</p>
          </div>
        )}

        <Button
          onClick={onDismiss}
          className="w-full rounded-full font-bold h-11 gap-2"
        >
          Keep Blooming! 🌸
        </Button>
      </div>
    </div>
  );
}
