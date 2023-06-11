import type monaco from "monaco-editor";
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig({ content: [] }) as any;

const colorsString = JSON.stringify(fullConfig.theme.colors);
// remove all of the # from the colors
const colors = colorsString.replace(/#/g, "");

const c = JSON.parse(colors);

export const theme: monaco.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "emphasis", fontStyle: "italic" },
    {
      background: c.gray["900"],
      token: "",
    },
    {
      foreground: c.gray["600"],
      token: "comment",
    },
    {
      foreground: c.emerald["400"],
      token: "keyword",
    },
    {
      foreground: c.emerald["400"],
      token: "annotation",
    },
    {
      foreground: c.sky["500"],
      token: "identifier",
    },
    {
      foreground: c.emerald["100"],
      token: "support",
    },
    {
      foreground: c.emerald["400"],
      token: "punctuation",
    },
    {
      foreground: c.sky["200"],
      token: "string",
    },
    {
      foreground: c.violet["400"],
      token: "delimiter",
    },
    {
      foreground: c.red["100"],
      background: c.sky["400"],
      token: "invalid",
    },
  ],
  colors: {
    "editor.foreground": "#" + c.gray["400"],
    "editor.background": "#" + c.gray["900"],
    "editor.selectionBackground": "#" + c.gray["700"],
    "editor.lineHighlightBackground": "#" + c.gray["800"],
    "editorCursor.foreground": "#" + c.sky["400"],
    "editorWhitespace.foreground": "#" + c.gray["800"],
    "editorLineNumber.foreground": "#" + c.gray["700"],
    "editorIndentGuide.background": "#" + c.gray["800"],
    "editorIndentGuide.activeBackground": "#" + c.gray["700"],
    "scrollbarSlider.background": "#" + c.gray["700"],
    "scrollbar.shadow": "#" + c.gray["900"],
    "editorHoverWidget.background": "#" + c.gray["800"],
  },
};
