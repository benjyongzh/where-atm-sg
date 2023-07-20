const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("../tailwind.config.js");
const fullConfig = resolveConfig(tailwindConfig);
// console.log(fullConfig.theme.screens.md);
// => '768px'

const mediaBreakpoints = {
  sm: parseInt(fullConfig.theme.screens.sm.split("px")[0]),
  md: parseInt(fullConfig.theme.screens.md.split("px")[0]),
  lg: parseInt(fullConfig.theme.screens.lg.split("px")[0]),
  xl: parseInt(fullConfig.theme.screens.xl.split("px")[0]),
  "2xl": parseInt(fullConfig.theme.screens["2xl"].split("px")[0]),
};

export const getCurrentBreakpoint = (currentWidth: number) => {
  //switch
  if (currentWidth < mediaBreakpoints.sm) return "xs";
  if (currentWidth < mediaBreakpoints.md) return "sm";
  if (currentWidth < mediaBreakpoints.lg) return "md";
  if (currentWidth < mediaBreakpoints.xl) return "lg";
  if (currentWidth < mediaBreakpoints["2xl"]) return "xl";
  return "2xl";
};
