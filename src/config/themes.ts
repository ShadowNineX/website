export type ThemeConfig = {
  defaultTheme: string;
  storageKey: string;
  themes: Record<string, { label: string; color: string }>;
};

export const themeConfig = {
  defaultTheme: "gta6",
  storageKey: "shadownine-theme",
  themes: {
    tails: { label: "Tails", color: "#171936" },
    gta6: { label: "GTA6", color: "#24112e" },
  },
} as const satisfies ThemeConfig;
