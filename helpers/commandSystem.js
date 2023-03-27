// @ts-check

const { readdirSync } = require("fs");

let commands = [];

function loadCommands() {
  commands = [];
  readdirSync("./commands").forEach((f) => {
    if (!f.endsWith(".js")) return;
    const props = require(`../commands/${f}`);
    commands.push({
      command: props,
      slashCommand: {
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1,
      },
    });
    console.log(`[COMMAND] ${props.name} komutu yüklendi.`);
  });
}

/**
 * @param {string} name
 * @param {"slash" | "command" | undefined} slashOrCommand
 */
function getCommand(name, slashOrCommand) {
  const found = commands.find(({ slashCommand }) => slashCommand.name === name);
  if (!found) return;
  return slashOrCommand === "command"
    ? found.command
    : slashOrCommand === "slash"
    ? found.slashCommand
    : found;
}

/**
 * @param {"slash" | "command" | undefined} slashOrCommand
 */
function getCommands(slashOrCommand = undefined) {
  return commands.map((cmd) =>
    slashOrCommand === "command" ? cmd.command : slashOrCommand === "slash" ? cmd.slashCommand : cmd
  );
}

module.exports = {
  commands,
  loadCommands,
  getCommand,
  getCommands,
};
