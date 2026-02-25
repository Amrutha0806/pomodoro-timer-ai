import React, { useState } from 'react';
import { useGetCallerUserProfile, useUpdateSoundProfile } from '../hooks/useQueries';
import { playSound } from '../utils/audio';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Play, Loader2, Volume2 } from 'lucide-react';

const SOUNDS = [
  { id: 'chime', label: 'Chime', emoji: '🎵', desc: 'Gentle ascending chime' },
  { id: 'bell', label: 'Bell', emoji: '🔔', desc: 'Classic bell ring' },
  { id: 'ding', label: 'Ding', emoji: '✨', desc: 'Soft single ding' },
  { id: 'nature', label: 'Nature', emoji: '🐦', desc: 'Cheerful bird chirps' },
];

export default function SoundSettings() {
  const { data: profile } = useGetCallerUserProfile();
  const updateSound = useUpdateSoundProfile();
  const [previewingSound, setPreviewingSound] = useState<string | null>(null);

  const currentSound = profile?.soundProfile?.sound ?? 'chime';
  const currentVolume = Number(profile?.soundProfile?.volume ?? 70);

  const handlePreview = async (soundId: string) => {
    setPreviewingSound(soundId);
    await playSound(soundId, currentVolume);
    setTimeout(() => setPreviewingSound(null), 2000);
  };

  const handleSoundChange = (soundId: string) => {
    updateSound.mutate({ sound: soundId, volume: currentVolume });
  };

  const handleVolumeChange = (value: number[]) => {
    updateSound.mutate({ sound: currentSound, volume: value[0] });
  };

  return (
    <div className="space-y-4">
      {/* Sound Selection */}
      <div className="grid grid-cols-2 gap-2">
        {SOUNDS.map((sound) => (
          <div
            key={sound.id}
            className={`relative flex flex-col gap-1 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
              currentSound === sound.id
                ? 'border-primary bg-primary/5'
                : 'border-border/50 bg-muted/20 hover:border-primary/40'
            }`}
            onClick={() => handleSoundChange(sound.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{sound.emoji}</span>
                <span className="font-bold text-sm">{sound.label}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(sound.id);
                }}
              >
                {previewingSound === sound.id ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Play size={12} />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">{sound.desc}</p>
            {currentSound === sound.id && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
        ))}
      </div>

      {/* Volume */}
      <div className="space-y-2 p-3 bg-muted/40 rounded-2xl">
        <div className="flex items-center justify-between">
          <Label className="font-bold flex items-center gap-2">
            <Volume2 size={16} />
            Volume
          </Label>
          <span className="text-sm font-bold text-primary">{currentVolume}%</span>
        </div>
        <Slider
          value={[currentVolume]}
          min={0}
          max={100}
          step={5}
          onValueChange={handleVolumeChange}
          className="w-full"
        />
      </div>

      {updateSound.isPending && (
        <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
          <Loader2 size={12} className="animate-spin" /> Saving...
        </p>
      )}
    </div>
  );
}
