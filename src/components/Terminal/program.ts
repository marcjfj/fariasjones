import c from "ansi-colors";
import Theme from "./theme";
import FontFaceObserver from "fontfaceobserver";

const start = c.green("$ ");
const nl = "\r\n";

// const files = (await import.meta.glob("../../*/**")) || [];
// console.log(files);

const welcome = c.white(
  `Welcome to the terminal! \r\nType 'help' to get started.\r\n`
);

const initTerminal = async (termElement: HTMLElement, input: string) => {
  const { Terminal } = await import("xterm");
  await import("xterm/css/xterm.css");
  const term = new Terminal({
    ...Theme,
    rows: 10,
  });
  const font = new FontFaceObserver(Theme.fontFamily, {
    weight: Theme.fontWeight,
  });
  await font.load();
  term.open(termElement);
  term.onKey((e) => {
    if (e.domEvent.key === "Enter") {
      handleInput(term, input);
      term.write(nl + start);
      input = "";
      return;
    }
    if (e.domEvent.key === "Backspace") {
      if (!input.length) return;
      input = input.slice(0, -1);
      term.write("\b \b");
      return;
    }
    // if (e.domEvent.key === 'ArrowUp') {
    //   return;
    // }
    // if (e.domEvent.key === 'ArrowDown') {
    //   return;
    // }
    // if (e.domEvent.key === 'ArrowLeft') {
    //   return;
    // }
    input += e.key;

    term.write(e.key);
  });
  return term;
};

const printWelcome = (term: any) => {
  term.write(`${welcome} \r\n`);
  term.write(start);
};

const handleInput = (term: any, input: string) => {
  if (input === "help") {
    term.write(
      c.white(
        `Here are some commands you can try: \r\n\r\n` +
          `  ${c.green("ls")} - list directories \r\n` +
          `  ${c.green("cd")} - change directories \r\n` +
          `  ${c.green("open")} - open a file \r\n` +
          `  ${c.green("clear")} - Clear the terminal \r\n`
      )
    );
    return;
  }
};

export const runProgram = async (termElement: HTMLElement, input: string) => {
  const term = await initTerminal(termElement, input);
  printWelcome(term);
};
