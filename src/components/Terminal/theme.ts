import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig({ content: [] }) as any;

const { colors } = fullConfig.theme;

export default {
  fontFamily: "IBM Plex Mono",
  fontSize: 12,
  fontWeight: 300,
  lineHeight: 1.2,
  cursorBlink: true,
  theme: {
    background: colors.gray["900"],
    foreground: colors.sky["200"],
    cursor: colors.emerald["400"],
    cursorAccent: colors.emerald["900"],
    selectionForeground: colors.amber["400"],
    selectionBackground: colors.sky["800"],
    black: "#000",
    red: colors.red["400"],
    green: colors.emerald["400"],
    yellow: colors.yellow["400"],
    blue: colors.sky["400"],
    magenta: "#f0f",
    cyan: "#0ff",
    white: colors.sky["200"],
    brightBlack: "#666",
    brightRed: "#f00",
    brightGreen: "#0f0",
    brightYellow: "#ff0",
    brightBlue: "#00f",
    brightMagenta: "#f0f",
    brightCyan: "#0ff",
    brightWhite: "#fff",
  },
};
