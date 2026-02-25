@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Pacifico&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: 1rem;

    /* Cherry Blossom (default) */
    --background: 0.97 0.01 350;
    --foreground: 0.25 0.04 340;
    --card: 0.99 0.005 350;
    --card-foreground: 0.25 0.04 340;
    --popover: 0.99 0.005 350;
    --popover-foreground: 0.25 0.04 340;
    --primary: 0.65 0.18 350;
    --primary-foreground: 0.99 0.005 350;
    --secondary: 0.93 0.04 340;
    --secondary-foreground: 0.35 0.06 340;
    --muted: 0.93 0.02 340;
    --muted-foreground: 0.55 0.04 340;
    --accent: 0.88 0.08 340;
    --accent-foreground: 0.35 0.06 340;
    --destructive: 0.577 0.245 27.325;
    --destructive-foreground: 0.985 0 0;
    --border: 0.88 0.04 340;
    --input: 0.88 0.04 340;
    --ring: 0.65 0.18 350;

    /* Timer ring colors */
    --timer-focus: 0.65 0.18 350;
    --timer-break: 0.72 0.14 160;
    --timer-long-break: 0.68 0.14 260;

    /* Chart colors */
    --chart-1: 0.65 0.18 350;
    --chart-2: 0.72 0.14 160;
    --chart-3: 0.68 0.14 260;
    --chart-4: 0.78 0.16 80;
    --chart-5: 0.70 0.16 30;

    --sidebar: 0.99 0.005 350;
    --sidebar-foreground: 0.25 0.04 340;
    --sidebar-primary: 0.65 0.18 350;
    --sidebar-primary-foreground: 0.99 0.005 350;
    --sidebar-accent: 0.93 0.04 340;
    --sidebar-accent-foreground: 0.35 0.06 340;
    --sidebar-border: 0.88 0.04 340;
    --sidebar-ring: 0.65 0.18 350;
  }

  .theme-cherry-blossom {
    --background: 0.97 0.01 350;
    --foreground: 0.25 0.04 340;
    --card: 0.99 0.005 350;
    --card-foreground: 0.25 0.04 340;
    --primary: 0.65 0.18 350;
    --primary-foreground: 0.99 0.005 350;
    --secondary: 0.93 0.04 340;
    --secondary-foreground: 0.35 0.06 340;
    --muted: 0.93 0.02 340;
    --muted-foreground: 0.55 0.04 340;
    --accent: 0.88 0.08 340;
    --accent-foreground: 0.35 0.06 340;
    --border: 0.88 0.04 340;
    --input: 0.88 0.04 340;
    --ring: 0.65 0.18 350;
    --timer-focus: 0.65 0.18 350;
    --timer-break: 0.72 0.14 160;
  }

  .theme-mint-garden {
    --background: 0.96 0.02 160;
    --foreground: 0.22 0.05 160;
    --card: 0.99 0.01 160;
    --card-foreground: 0.22 0.05 160;
    --primary: 0.60 0.16 160;
    --primary-foreground: 0.99 0.01 160;
    --secondary: 0.90 0.05 160;
    --secondary-foreground: 0.30 0.07 160;
    --muted: 0.92 0.02 160;
    --muted-foreground: 0.52 0.05 160;
    --accent: 0.85 0.08 160;
    --accent-foreground: 0.30 0.07 160;
    --border: 0.85 0.05 160;
    --input: 0.85 0.05 160;
    --ring: 0.60 0.16 160;
    --timer-focus: 0.60 0.16 160;
    --timer-break: 0.65 0.14 200;
  }

  .theme-lavender-dream {
    --background: 0.96 0.02 280;
    --foreground: 0.22 0.05 280;
    --card: 0.99 0.01 280;
    --card-foreground: 0.22 0.05 280;
    --primary: 0.62 0.18 280;
    --primary-foreground: 0.99 0.01 280;
    --secondary: 0.90 0.05 280;
    --secondary-foreground: 0.30 0.07 280;
    --muted: 0.92 0.02 280;
    --muted-foreground: 0.52 0.05 280;
    --accent: 0.85 0.08 280;
    --accent-foreground: 0.30 0.07 280;
    --border: 0.85 0.05 280;
    --input: 0.85 0.05 280;
    --ring: 0.62 0.18 280;
    --timer-focus: 0.62 0.18 280;
    --timer-break: 0.68 0.14 320;
  }

  .theme-sunny-citrus {
    --background: 0.97 0.02 80;
    --foreground: 0.22 0.06 80;
    --card: 0.99 0.01 80;
    --card-foreground: 0.22 0.06 80;
    --primary: 0.72 0.18 60;
    --primary-foreground: 0.22 0.06 80;
    --secondary: 0.92 0.05 80;
    --secondary-foreground: 0.30 0.08 80;
    --muted: 0.93 0.02 80;
    --muted-foreground: 0.52 0.05 80;
    --accent: 0.87 0.09 80;
    --accent-foreground: 0.30 0.08 80;
    --border: 0.87 0.05 80;
    --input: 0.87 0.05 80;
    --ring: 0.72 0.18 60;
    --timer-focus: 0.72 0.18 60;
    --timer-break: 0.68 0.14 140;
  }

  .theme-midnight-stars {
    --background: 0.14 0.04 260;
    --foreground: 0.92 0.02 260;
    --card: 0.20 0.05 260;
    --card-foreground: 0.92 0.02 260;
    --primary: 0.72 0.18 280;
    --primary-foreground: 0.14 0.04 260;
    --secondary: 0.28 0.06 260;
    --secondary-foreground: 0.85 0.02 260;
    --muted: 0.26 0.04 260;
    --muted-foreground: 0.65 0.04 260;
    --accent: 0.32 0.08 260;
    --accent-foreground: 0.85 0.02 260;
    --border: 0.30 0.06 260;
    --input: 0.30 0.06 260;
    --ring: 0.72 0.18 280;
    --timer-focus: 0.72 0.18 280;
    --timer-break: 0.68 0.16 200;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-nunito;
    background-image: url('/assets/generated/doodle-pattern-tile.dim_400x400.png');
    background-repeat: repeat;
    background-size: 200px 200px;
    background-attachment: fixed;
    background-blend-mode: overlay;
  }
}

@layer utilities {
  .font-nunito {
    font-family: 'Nunito', sans-serif;
  }
  .font-pacifico {
    font-family: 'Pacifico', cursive;
  }

  /* card-cute: uses plain CSS to avoid @apply opacity modifier issues */
  .card-cute {
    background-color: oklch(var(--card));
    border-radius: 2rem;
    box-shadow: 0 4px 20px -2px rgba(0,0,0,0.08), 0 2px 8px -2px rgba(0,0,0,0.04);
    border: 1px solid oklch(var(--border) / 0.5);
  }

  .btn-cute {
    @apply rounded-full font-bold transition-all duration-200 active:scale-95;
  }

  .timer-ring-focus {
    stroke: oklch(var(--timer-focus));
  }

  .timer-ring-break {
    stroke: oklch(var(--timer-break));
  }

  .timer-ring-long-break {
    stroke: oklch(var(--timer-long-break));
  }
}

/* Confetti animation */
@keyframes confetti-fall {
  0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}

@keyframes sparkle-pop {
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.3) rotate(180deg); opacity: 1; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
}

@keyframes gift-bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-12px) scale(1.05); }
  50% { transform: translateY(-6px) scale(1.02); }
  75% { transform: translateY(-10px) scale(1.04); }
}

@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-60px) scale(0.5); opacity: 0; }
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 0.4; }
  100% { transform: scale(1); opacity: 0.8; }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-gift-bounce { animation: gift-bounce 1.5s ease-in-out infinite; }
.animate-sparkle { animation: sparkle-pop 1.2s ease-in-out infinite; }
.animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
.animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
.animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
.animate-pulse-ring { animation: pulse-ring 2s ease-in-out infinite; }
