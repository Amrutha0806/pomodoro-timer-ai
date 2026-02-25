import React, { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { getThemeConfig } from './styles/themes';
import { Theme } from './backend';
import Layout from './components/Layout';
import ProfileSetup from './components/ProfileSetup';
import TimerPage from './pages/TimerPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import { Loader2 } from 'lucide-react';

type Page = 'timer' | 'dashboard' | 'settings';

function AppContent() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [currentPage, setCurrentPage] = useState<Page>('timer');

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  // Apply theme to document root
  useEffect(() => {
    const theme = userProfile?.theme ?? Theme.cherryBlossom;
    const themeConfig = getThemeConfig(theme);

    // Remove all theme classes
    document.documentElement.classList.remove(
      'theme-cherry-blossom',
      'theme-mint-garden',
      'theme-lavender-dream',
      'theme-sunny-citrus',
      'theme-midnight-stars'
    );
    document.documentElement.classList.add(themeConfig.cssClass);
  }, [userProfile?.theme]);

  const showProfileSetup =
    isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const userName = undefined; // Name not stored in UserProfile type

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/assets/generated/pomo-bloom-logo.dim_256x256.png"
            alt="Pomo Bloom"
            className="w-16 h-16 rounded-2xl animate-pulse"
          />
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium">Loading Pomo Bloom...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout
        currentPage={currentPage}
        onNavigate={(p) => setCurrentPage(p as Page)}
        isAuthenticated={false}
      >
        <LandingScreen />
      </Layout>
    );
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={(p) => setCurrentPage(p as Page)}
      isAuthenticated={isAuthenticated}
      userName={userName}
    >
      <ProfileSetup open={showProfileSetup} />

      {currentPage === 'timer' && <TimerPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'settings' && <SettingsPage />}
    </Layout>
  );
}

function LandingScreen() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8 px-4">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4">
        <img
          src="/assets/generated/pomo-bloom-logo.dim_256x256.png"
          alt="Pomo Bloom"
          className="w-24 h-24 rounded-3xl shadow-cute-lg"
        />
        <div>
          <h1 className="font-pacifico text-5xl text-primary mb-2">Pomo Bloom</h1>
          <p className="text-lg text-muted-foreground font-medium max-w-sm">
            Your cute & cozy Pomodoro companion 🌸
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
        {[
          { emoji: '🍅', text: 'Pomodoro Timer' },
          { emoji: '📊', text: 'Progress Stats' },
          { emoji: '🔥', text: 'Streak Tracking' },
          { emoji: '🎨', text: 'Custom Themes' },
          { emoji: '🎵', text: 'Sound Alerts' },
          { emoji: '🎁', text: 'Cute Rewards' },
        ].map((f) => (
          <div
            key={f.text}
            className="flex items-center gap-2 p-3 bg-card rounded-2xl shadow-cute border border-border/40 text-sm font-bold"
          >
            <span className="text-xl">{f.emoji}</span>
            {f.text}
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={login}
        disabled={isLoggingIn}
        className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-cute-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
      >
        {isLoggingIn ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Logging in...
          </>
        ) : (
          <>
            🌸 Start Blooming
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground">
        Secure login with Internet Identity · No passwords needed
      </p>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
