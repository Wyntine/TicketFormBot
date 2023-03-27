// @ts-check

const { Client } = require("discord.js");
const { readdirSync } = require("fs");

let events = [];

/**
 * @param {Client} client
 */
function loadEvents(client) {
  events = [];
  readdirSync("./events").forEach((e) => {
    const eve = require(`../events/${e}`);
    const name = e.split(".")[0];
    client.on(name, (...args) => eve(...args));
    console.log(`[EVENT] ${name} eventi yüklendi.`);
  });
}

module.exports = {
  events,
  loadEvents,
};
