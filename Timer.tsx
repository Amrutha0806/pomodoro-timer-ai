import React, { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Theme } from '../backend';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles } from 'lucide-react';

interface ProfileSetupProps {
  open: boolean;
}

export default function ProfileSetup({ open }: ProfileSetupProps) {
  const { identity } = useInternetIdentity();
  const [name, setName] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !identity) return;

    await saveProfile.mutateAsync({
      theme: Theme.cherryBlossom,
      soundProfile: { sound: 'chime', volume: BigInt(70) },
      totalPomodoros: BigInt(0),
      totalFocusTime: BigInt(0),
      streak: {
        currentStreak: BigInt(0),
        highestStreak: BigInt(0),
        lastCompleted: BigInt(0),
        milestones: [],
      },
      sessions: [],
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="rounded-3xl border-border/50 shadow-cute-xl max-w-sm" showCloseButton={false}>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
              🌸
            </div>
          </div>
          <DialogTitle className="font-pacifico text-2xl text-primary">
            Welcome to Pomo Bloom!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-nunito">
            Let's set up your cozy little workspace. What should we call you?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold text-foreground">
              Your Name ✨
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sakura, Alex, Bloom..."
              className="rounded-2xl border-border/60 focus:border-primary font-nunito"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={!name.trim() || saveProfile.isPending}
            className="w-full rounded-full font-bold gap-2 h-11"
          >
            {saveProfile.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {saveProfile.isPending ? 'Setting up...' : "Let's Bloom! 🌸"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
