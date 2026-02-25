import React from 'react';
import SoundSettings from '../components/SoundSettings';
import ThemePicker from '../components/ThemePicker';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-2">
        <h1 className="font-pacifico text-3xl text-primary mb-1">Settings ⚙️</h1>
        <p className="text-sm text-muted-foreground font-medium">
          Make it yours! Customize your bloom space 🌸
        </p>
      </div>

      {/* Sound Settings */}
      <section className="bg-card rounded-3xl shadow-cute border border-border/50 p-5">
        <h2 className="font-bold text-base mb-4 flex items-center gap-2">
          <span>🎵</span> Sound Settings
        </h2>
        <SoundSettings />
      </section>

      <Separator className="opacity-30" />

      {/* Theme Picker */}
      <section className="bg-card rounded-3xl shadow-cute border border-border/50 p-5">
        <h2 className="font-bold text-base mb-4 flex items-center gap-2">
          <span>🎨</span> Choose Your Theme
        </h2>
        <ThemePicker />
      </section>
    </div>
  );
}
