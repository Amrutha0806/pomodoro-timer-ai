import React from 'react';
import { useGetCallerUserProfile, useUpdateTheme } from '../hooks/useQueries';
import { Theme } from '../backend';
import { THEMES } from '../styles/themes';
import { Loader2, Check } from 'lucide-react';

export default function ThemePicker() {
  const { data: profile } = useGetCallerUserProfile();
  const updateTheme = useUpdateTheme();

  const currentTheme = profile?.theme ?? Theme.cherryBlossom;

  const handleThemeChange = (theme: Theme) => {
    updateTheme.mutate(theme);
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {THEMES.map((theme) => (
        <div
          key={theme.id}
          className={`flex items-center gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
            currentTheme === theme.id
              ? 'border-primary bg-primary/5'
              : 'border-border/50 hover:border-primary/40'
          }`}
          onClick={() => handleThemeChange(theme.id)}
        >
          {/* Color swatches */}
          <div className="flex gap-1 shrink-0">
            {Object.values(theme.colors).map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border border-white/50 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">{theme.emoji}</span>
              <span className="font-bold text-sm text-foreground">{theme.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{theme.description}</p>
          </div>

          {currentTheme === theme.id && (
            <div className="shrink-0">
              {updateTheme.isPending ? (
                <Loader2 size={16} className="animate-spin text-primary" />
              ) : (
                <Check size={16} className="text-primary" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
