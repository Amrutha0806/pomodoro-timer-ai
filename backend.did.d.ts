import React from 'react';
import { Timer, BarChart2, Settings } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  { id: 'timer', label: 'Timer', icon: Timer, emoji: '🍅' },
  { id: 'dashboard', label: 'Stats', icon: BarChart2, emoji: '📊' },
  { id: 'settings', label: 'Settings', icon: Settings, emoji: '⚙️' },
];

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="flex gap-1 bg-muted/40 rounded-full p-1 border border-border/40">
      {NAV_ITEMS.map((item) => {
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              isActive
                ? 'bg-card text-foreground shadow-cute'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-base">{item.emoji}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
