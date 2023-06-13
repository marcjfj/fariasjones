export const initEditor = async (container: HTMLElement, content?: string) => {
  const monaco = await import("monaco-editor");
  const { default: editorWorker } = await import(
    "monaco-editor/esm/vs/editor/editor.worker?worker"
  );
  const { default: jsonWorker } = await import(
    "monaco-editor/esm/vs/language/json/json.worker?worker"
  );
  const { default: cssWorker } = await import(
    "monaco-editor/esm/vs/language/css/css.worker?worker"
  );
  const { default: htmlWorker } = await import(
    "monaco-editor/esm/vs/language/html/html.worker?worker"
  );
  const { default: tsWorker } = await import(
    "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
  );

  const { theme } = await import("./theme");
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === "json") {
        return new jsonWorker();
      }
      if (label === "css" || label === "scss" || label === "less") {
        return new cssWorker();
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        return new htmlWorker();
      }
      if (label === "typescript" || label === "javascript") {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };
  const defaultContent = "";
  const editor = monaco.editor.create(container, {
    value: content || defaultContent,
    language: "markdown",
    fontSize: window.innerWidth < 768 ? 10 : 12,
    fontFamily: "IBM Plex Mono",
    fontLigatures: true,
    scrollBeyondLastLine: false,
    lineHeight: 20,
    fontWeight: "300",
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
  });

  monaco.editor.defineTheme("theme", theme);
  monaco.editor.setTheme("theme");

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

  return { editor, monaco };
};
