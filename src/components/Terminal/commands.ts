import { nl, pause } from "./utils";
import c from "ansi-colors";

const handleCd = async (
  term: any,
  args: string[],
  position: string,
  tree: any,
  ...rest: any[]
) => {
  if (!args.length) return {};

  const path = args[0].endsWith("/") ? args[0].slice(0, -1) : args[0];

  if (!path || path === "~") {
    position = "";
    return { position };
  }
  const pathParts = path.split("/");
  pathParts.forEach((part) => {
    if (part === "..") {
      if (!position) {
        term.write(nl);
        term.write(c.red("You are already at the root"));
        term.write(nl);
        return;
      } else {
        const positionParts = position.split("/");
        positionParts.pop();
        position = positionParts.length ? positionParts.join("/") : "";
        return;
      }
    }
    const matched = tree.find(
      (i: any) =>
        part &&
        i.path === `${position ? position + "/" : ""}${part}` &&
        i.type === "tree"
    );

    if (matched) {
      position = matched.path;
    } else {
      term.write(nl);
      term.write(c.red(`Directory not found: ${path}`));
      term.write(nl);
    }
  });
  return { position };
};

const positionFilter = (item: any, pos: string) => {
  if (!pos) return !item.path.includes("/");
  return (
    item.path.startsWith(pos) &&
    item.path.replace(pos + "/", "").split("/").length < 2
  );
};
const cleanPath = (path: string) => {
  return path.split("/").pop();
};
export const listDir = async (
  term: any,
  path: string = "",
  position: string,
  tree: any
) => {
  const items = tree
    .filter((i: any) =>
      positionFilter(i, position + (position && path ? "/" : "") + path)
    )
    .map((i: any) => ({ ...i, path: cleanPath(i.path) }));
  console.log(position + (position && path ? "/" : "") + path);
  console.log(items);
  for await (let i of items) {
    await pause(120);
    term.write((i.type === "blob" ? c.blue : c.white)(i.path));
    term.write(nl);
  }
  return {};
};

const handleLs = async (
  term: any,
  args: string[],
  position: string,
  tree: any,
  ...rest: any[]
) => {
  let path = args[0];
  // remove leading or trailing slash
  if (path && path.startsWith("/")) path = path.slice(1);
  if (path && path.endsWith("/")) path = path.slice(0, -1);

  if (!path || path === "~") {
    await listDir(term, path, position, tree);
    return {};
  }
  const matched = tree.find(
    (i: any) =>
      i.path === `${position ? position + "/" : ""}${path}` && i.type === "tree"
  );
  if (matched) {
    await listDir(term, path, position, tree);
    return {};
  }
  term.write(nl);
  term.write(c.red(`Directory not found: ${path}`));
  term.write(nl);
  return {};
};

const handleHelp = (term: any) => {
  term.write(nl);
  term.write(
    c.white(
      `Here are some commands you can try: \r\n\r\n` +
        commands
          .map((cmd) => c.blue(`  ${c.white(cmd.name)} - ${cmd.description}`))
          .join("\r\n")
    )
  );
  term.write(nl);
  return {};
};

export const handleOpen = (
  term: any,
  args: string[],
  position: string,
  tree: any,
  dispatch: any
) => {
  const path = args[0];
  if (!path || path === "~") {
    term.write(nl);
    term.write(c.red(`Please provide a file path`));
    term.write(nl);
    return;
  }
  const matched = tree.find(
    (i: any) =>
      i.path === `${position ? position + "/" : ""}${path}` && i.type === "blob"
  );
  if (matched) {
    term.write(nl);
    term.write(c.white(`Opening ${matched.path}`));
    term.write(nl);
    dispatch("open", { file: matched });
  } else {
    term.write(nl);
    term.write(c.red(`File not found: ${path}`));
    term.write(nl);
  }
  return {};
};

interface Command {
  name: string;
  description: string;
  handler: (
    term: any,
    args: string[],
    position: string,
    tree: any,
    ...rest: any[]
  ) => any;
}

const commands = [
  {
    name: "help",
    description: "List available commands",
    handler: handleHelp,
  },
  {
    name: "ls",
    description: "List directories",
    handler: handleLs,
  },
  {
    name: "cd",
    description: "Change directories",
    handler: handleCd,
  },
  {
    name: "open",
    description: "Open a file",
    handler: handleOpen,
  },
  {
    name: "clear",
    description: "Clear the terminal",
    handler: (...args) => {
      args[0].clear();
      return {};
    },
  },
] as Command[];

export default commands;
