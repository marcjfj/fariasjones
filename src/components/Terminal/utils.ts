import c from "ansi-colors";

export const pause = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const nl = "\r\n";

export const clearLine = (term: any) => {
  term.write("\x1b[2K\r");
};

export const start = (position: string) => {
  return c.green(`${position ? position + " " : ""}[main] $ `);
};

export const nlst = (pos: string) => nl + start(pos);

export const moveLeft = (term: any, length: number = 1) => {
  term.write("\x1b[D".repeat(length));
};

export const slowType = async (term: any, text: string) => {
  const textArr = text.split("");
  for await (let char of textArr) {
    await pause(30);
    term.write(char);
  }
}