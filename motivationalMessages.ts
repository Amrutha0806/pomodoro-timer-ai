import { Theme } from '../backend';

export interface ThemeConfig {
  id: Theme;
  name: string;
  emoji: string;
  description: string;
  cssClass: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
  };
}

export const THEMES: ThemeConfig[] = [
  {
    id: Theme.cherryBlossom,
    name: 'Cherry Blossom',
    emoji: '🌸',
    description: 'Soft pinks & rosy hues',
    cssClass: 'theme-cherry-blossom',
    colors: {
      primary: '#e8789a',
      secondary: '#f5c6d8',
      accent: '#fce4ec',
      bg: '#fff5f8',
    },
  },
  {
    id: Theme.mintGarden,
    name: 'Mint Garden',
    emoji: '🌿',
    description: 'Fresh greens & minty tones',
    cssClass: 'theme-mint-garden',
    colors: {
      primary: '#5cb88a',
      secondary: '#b8e8d0',
      accent: '#e0f5ec',
      bg: '#f0faf5',
    },
  },
  {
    id: Theme.lavenderDream,
    name: 'Lavender Dream',
    emoji: '💜',
    description: 'Dreamy purples & lilacs',
    cssClass: 'theme-lavender-dream',
    colors: {
      primary: '#9b72cf',
      secondary: '#d8c4f0',
      accent: '#ede4f8',
      bg: '#f5f0fc',
    },
  },
  {
    id: Theme.sunnyCitrus,
    name: 'Sunny Citrus',
    emoji: '🍋',
    description: 'Warm yellows & oranges',
    cssClass: 'theme-sunny-citrus',
    colors: {
      primary: '#e8a020',
      secondary: '#f5dfa0',
      accent: '#fef3d0',
      bg: '#fffbf0',
    },
  },
  {
    id: Theme.midnightStars,
    name: 'Midnight Stars',
    emoji: '🌙',
    description: 'Deep blues & starlight',
    cssClass: 'theme-midnight-stars',
    colors: {
      primary: '#a78bfa',
      secondary: '#4c3d8a',
      accent: '#2d2560',
      bg: '#1a1535',
    },
  },
];

export function getThemeConfig(theme: Theme): ThemeConfig {
  return THEMES.find((t) => t.id === theme) ?? THEMES[0];
}
