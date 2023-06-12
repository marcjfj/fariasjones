import c from "ansi-colors";
import Theme from "./theme";
import FontFaceObserver from "fontfaceobserver";
import { pause, nl, start, nlst, clearLine, moveLeft, slowType } from "./utils";
import commands, { listDir } from "./commands";

let dispatch: any = null;

let tree: any = null;

let position = "";

const history: string[] = [];
let historyIndex = -1;

let cursorPosition: number = 0;

const fetchRepo = async () => {
  const res = await fetch("/repo");
  const repoData = await res.json();
  return repoData;
};

const welcome = c.white(
  `Welcome to the terminal! \r\nType 'help' to get started.\r\n`
);

const initTerminal = async (termElement: HTMLElement, input: string) => {
  const { Terminal } = await import("xterm");
  await import("xterm/css/xterm.css");
  const { FitAddon } = await import("xterm-addon-fit");

  const term = new Terminal({
    ...Theme,
    rows: 10,
  });
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);

  const font = new FontFaceObserver(Theme.fontFamily, {
    weight: Theme.fontWeight,
  });
  await font.load();
  term.open(termElement);
  fitAddon.fit();
  term.onKey(async (e) => {
    if (e.domEvent.key === "Enter") {
      if (!input.length) return term.write(nlst(position));
      if (!history.includes(input)) {
        history.unshift(input);
      }
      term.write(nl);
      await handleCmd(term, input);
      term.write(nlst(position));
      cursorPosition = 0;
      input = "";
      return;
    }
    if (e.domEvent.key === "Backspace") {
      if (!input.length) return;
      input = input.slice(0, -1);
      term.write("\b \b");
      return;
    }
    if (e.domEvent.key === "ArrowUp") {
      e.domEvent.preventDefault();
      if (history.length) {
        if (historyIndex < history.length - 1) {
          historyIndex++;
        }
        input = history[historyIndex];
        cursorPosition = input.length;
        clearLine(term);
        term.write(`\r${start(position)}${input}`);
        cursorPosition = input.length;
      }
      return;
    }
    if (e.domEvent.key === "ArrowDown") {
      e.domEvent.preventDefault();
      if (history.length) {
        if (historyIndex > 0) {
          historyIndex--;
        }
        input = history[historyIndex];
        cursorPosition = input.length;
        clearLine(term);
        term.write(`\r${start(position)}${input}`);
      }
      return;
    }
    if (e.domEvent.key === "ArrowLeft") {
      if (cursorPosition === 0) return;
      cursorPosition--;
      term.write(e.key);
      return;
    }
    if (e.domEvent.key === "ArrowRight") {
      if (cursorPosition >= input.length) return;
      cursorPosition++;
      term.write(e.key);
      return;
    }
    if (cursorPosition >= input.length) {
      input += e.key;
      cursorPosition++;
      term.write(e.key);
    } else {
      const start = input.slice(0, cursorPosition);
      const end = input.slice(cursorPosition);
      input = start + e.key + end;
      term.write(e.key);
      term.write(end);
      moveLeft(term, end.length);
      cursorPosition++;
    }
  });
  return term;
};

const printWelcome = (term: any) => {
  term.write(`${welcome} \r\n`);
};

const handleCmd = async (term: any, input: string) => {
  const [cmd, ...args] = input.split(" ");
  const matched = commands.find((i) => i.name === cmd);
  if (matched) {
    const out = await matched.handler(term, args, position, tree, dispatch);
    if (out.hasOwnProperty("position")) {
      position = out.position;
    }
    return;
  } else {
    term.write(nl);
    term.write(c.red(`Command not found: ${cmd}`));
    term.write(nl);
    return;
  }
};

export const runProgram = async (
  termElement: HTMLElement,
  input: string,
  dispatcher: any
) => {
  dispatch = dispatcher;
  const term = await initTerminal(termElement, input);
  printWelcome(term);
  const repo = await fetchRepo();
  tree = repo.tree;
  await pause(1000);
  term.write(c.green('$ '))
  await pause(200);
  await slowType(term, "git clone https://github.com/marcjfj/fariasjones.git .");
  term.write(nl);
  term.write(`Cloning into '.'...`);
  await pause(1000);
  term.write(nl);
  term.write(`remote: Enumerating objects: 151, done.`);
  await pause(200);
  term.write(nl);
  term.write(`remote: Counting objects: 100% (151/151), done.`);
  await pause(200);
  term.write(nl);
  term.write(`Compressing objects: 100% (151/151), done.`);
  await pause(200);
  term.write(nl);
  term.write(`remote: Total 151 (delta 56), reused 128 (delta 33), pack-reused 0`);
  await pause(200);
  term.write(nl);
  term.write(`100% (151/151), 243.76 KiB | 1.85 MiB/s, done.`);
  await pause(200);
  term.write(nl);
  term.write(`Resolving deltas: 100% (56/56), done.`);
  await pause(200);
  term.write(nlst(position));
  await pause(1000);
  slowType(term, "ls");
  await pause(500);
  term.write(nl);
  await listDir(term, "", position, tree);
  term.write(nlst(position));


  input = "";
  cursorPosition = 0;
  return;
};
