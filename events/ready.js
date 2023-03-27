// @ts-check

const { Client } = require("discord.js");
const { getCommands } = require("../helpers/commandSystem");

/** @param {Client<true>} client */
module.exports = async (client) => {
  try {
    await client.application.commands.set(getCommands("slash"));
  } catch (error) {
    console.error(error);
  }
  console.log(`${client.user.tag} Aktif!`);
};
