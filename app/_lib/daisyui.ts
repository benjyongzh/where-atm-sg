import daisyuiColors from "daisyui/src/theming/themes";

export interface ThemeColors {
  primary: string;
  primaryFocus: string;
  primaryContent: string;
  secondary: string;
  secondaryFocus: string;
  secondaryContent: string;
  accent: string;
  accentFocus: string;
  accentContent: string;
  neutral: string;
  neutralFocus: string;
  neutralContent: string;
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
  info: string;
  infoContent: string;
  success: string;
  successContent: string;
  warning: string;
  warningContent: string;
  error: string;
  errorContent: string;
}

export function extractThemeColorsFromDOM(): ThemeColors {
  const computedStyles = getComputedStyle(document.querySelector(":root")!);
  return {
    primary: `hsl(${computedStyles.getPropertyValue("--p")}`,
    primaryFocus: `hsl(${computedStyles.getPropertyValue("--pf")}`,
    primaryContent: `hsl(${computedStyles.getPropertyValue("--pc")}`,
    secondary: `hsl(${computedStyles.getPropertyValue("--s")}`,
    secondaryFocus: `hsl(${computedStyles.getPropertyValue("--sf")}`,
    secondaryContent: `hsl(${computedStyles.getPropertyValue("--sc")}`,
    accent: `hsl(${computedStyles.getPropertyValue("--a")}`,
    accentFocus: `hsl(${computedStyles.getPropertyValue("--af")}`,
    accentContent: `hsl(${computedStyles.getPropertyValue("--ac")}`,
    neutral: `hsl(${computedStyles.getPropertyValue("--n")}`,
    neutralFocus: `hsl(${computedStyles.getPropertyValue("--nf")}`,
    neutralContent: `hsl(${computedStyles.getPropertyValue("--nc")}`,
    base100: `hsl(${computedStyles.getPropertyValue("--b1")}`,
    base200: `hsl(${computedStyles.getPropertyValue("--b2")}`,
    base300: `hsl(${computedStyles.getPropertyValue("--b3")}`,
    baseContent: `hsl(${computedStyles.getPropertyValue("--bc")}`,
    info: `hsl(${computedStyles.getPropertyValue("--in")}`,
    infoContent: `hsl(${computedStyles.getPropertyValue("--inc")}`,
    success: `hsl(${computedStyles.getPropertyValue("--su")}`,
    successContent: `hsl(${computedStyles.getPropertyValue("--suc")}`,
    warning: `hsl(${computedStyles.getPropertyValue("--wa")}`,
    warningContent: `hsl(${computedStyles.getPropertyValue("--wac")}`,
    error: `hsl(${computedStyles.getPropertyValue("--er")}`,
    errorContent: `hsl(${computedStyles.getPropertyValue("--erc")}`,
  };
}

/* cupcake theme
"[data-theme=cupcake]": {
  "color-scheme": "light",
  "primary": "#65c3c8",
  "secondary": "#ef9fbc",
  "accent": "#eeaf3a",
  "neutral": "#291334",
  "base-100": "#faf7f5",
  "base-200": "#efeae6",
  "base-300": "#e7e2df",
  "base-content": "#291334",
  "--rounded-btn": "1.9rem",
  "--tab-border": "2px",
  "--tab-radius": ".5rem",
}, */

/* "[data-theme=light]": {
  "color-scheme": "light",
  "primary": "#570df8",
  "primary-content": "#E0D2FE",
  "secondary": "#f000b8",
  "secondary-content": "#FFD1F4",
  "accent": "#1ECEBC",
  "accent-content": "#07312D",
  "neutral": "#2B3440",
  "neutral-content": "#D7DDE4",
  "base-100": "#ffffff",
  "base-200": "#F2F2F2",
  "base-300": "#E5E6E6",
  "base-content": "#1f2937",
}, */

/* 
"[data-theme=night]": {
  "color-scheme": "dark",
  "primary": "#38bdf8",
  "secondary": "#818CF8",
  "accent": "#F471B5",
  "neutral": "#1E293B",
  "neutral-focus": "#273449",
  "base-100": "#0F172A",
  "info": "#0CA5E9",
  "info-content": "#000000",
  "success": "#2DD4BF",
  "warning": "#F4BF50",
  "error": "#FB7085",
}, */
