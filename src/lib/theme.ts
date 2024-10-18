export interface Theme {
  "color-scheme": string;
  primary: string;
  secondary: string;
  accent: string;
  "base-100": string;
  "base-content"?: string;
  pattern?: string;
}
const themes: Record<string, Theme> = {
  // vibrant colors
  cosmicBlaze: {
    "color-scheme": "vibrant",
    primary: "#E9007F", // Vivid Pink (cor principal)
    secondary: "#dbdfff", // Vivid Blue (cor secundária)
    accent: "#8B00FF", // Deep Purple
    "base-100": "#13024E", // Azul escuro (mesmo que o fundo)
    pattern: "bolinha",
  },

  neonThunder: {
    "color-scheme": "vibrant",
    primary: "#ff7abd", // Bright Electric Blue
    secondary: "#dfd2d8", // Neon Pink
    accent: "#FF007F", // Hot Pink
    "base-100": "#771144", // Soft Whit
    pattern: "pulses",
  },

  midNigth: {
    "color-scheme": "vibrant",
    primary: "#3bf7d7", // Bright Electric Blue
    secondary: "#ddbbfd", // Neon Pink
    accent: "#FF007F", // Hot Pink
    "base-100": "#280647", // Soft White
    pattern: "nested",
  },
};

export default themes;
