import React from 'react';
import Navigation from './Navigation';
import LoginButton from './LoginButton';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  userName?: string;
}

export default function Layout({
  children,
  currentPage,
  onNavigate,
  isAuthenticated,
  userName,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/generated/pomo-bloom-logo.dim_256x256.png"
              alt="Pomo Bloom"
              className="w-9 h-9 rounded-xl object-cover"
            />
            <span className="font-pacifico text-xl text-primary hidden sm:block">
              Pomo Bloom
            </span>
          </div>

          {/* Navigation (only when authenticated) */}
          {isAuthenticated && (
            <Navigation currentPage={currentPage} onNavigate={onNavigate} />
          )}

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated && userName && (
              <span className="text-sm font-bold text-muted-foreground hidden md:block">
                Hi, {userName}! 🌸
              </span>
            )}
            <LoginButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/60 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 text-center text-xs text-muted-foreground">
          <p>
            Built with{' '}
            <span className="text-primary">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'pomo-bloom'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:underline"
            >
              caffeine.ai
            </a>
            {' '}· © {new Date().getFullYear()} Pomo Bloom
          </p>
        </div>
      </footer>
    </div>
  );
}
