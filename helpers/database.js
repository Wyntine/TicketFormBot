// @ts-check

const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./db/servers.json" });

const {
  TextChannel,
  Message,
  ChannelType,
  GuildMemberRoleManager,
  PermissionsBitField,
} = require("discord.js");

/**
 * @param {string | undefined} guildId
 * @param {string} adminId
 * @param {string} logChannelId
 */
function createTicketSystem(guildId, adminId, logChannelId) {
  if (typeof guildId !== "string") return;
  db.set(`${guildId}.destek`, { yetkili: adminId, log: logChannelId });
}

/**
 * @param {string | undefined} guildId
 * @returns {{
 *  log: string | undefined
 *  yetkili: string | undefined
 * }}
 */
function getTicketSystem(guildId) {
  const defaultValue = { log: undefined, yetkili: undefined };
  if (typeof guildId !== "string") return defaultValue;
  return db.get(`${guildId}.destek`) ?? defaultValue;
}

/**
 * @param {string | undefined} guildId
 * @returns {string | undefined}
 */
function getTicketSystemAdmin(guildId) {
  if (typeof guildId !== "string") return undefined;
  return db.get(`${guildId}.destek.yetkili`) ?? undefined;
}

/**
 * @param {string | undefined} guildId
 * @returns {string | undefined}
 */
function getTicketSystemLogChannel(guildId) {
  if (typeof guildId !== "string") return undefined;
  return db.get(`${guildId}.destek.log`) ?? undefined;
}

/**
 * @param {string | undefined} guildId
 */
function deleteTicketSystem(guildId) {
  if (typeof guildId !== "string") return;
  db.delete(`${guildId}.destek`);
}

/**
 * @param {import("discord.js").Interaction} interaction
 * @param {string} userId
 * @return {TextChannel | undefined}
 */
function getTicketChannel(interaction, userId) {
  const guild = interaction.guild;
  if (!guild) return;
  const channel = guild.channels.cache.find(
    (channel) => "topic" in channel && channel.topic === userId
  );
  if (!channel || channel.type !== ChannelType.GuildText) return;
  return channel;
}

/**
 * @param {import("discord.js").Interaction} interaction
 * @returns {boolean}
 */
function checkTicketAdmin(interaction) {
  const member = interaction.member;
  const guild = interaction.guild;
  const channel = interaction.channel;

  if (!channel || !("topic" in channel) || !guild || !member) return false;
  const adminRole = getTicketSystemAdmin(guild.id);
  if (!adminRole) return false;

  /** @type {GuildMemberRoleManager} */
  const memberRoles = member.roles;
  /** @type {Readonly<PermissionsBitField>} */
  const memberPermissions = member.permissions;

  const topicCheck = channel.topic === interaction.user.id;
  const permissionCheck = memberPermissions.has("Administrator", true);
  const roleCheck = memberRoles.cache.has(adminRole);

  return topicCheck || permissionCheck || roleCheck;
}

module.exports = {
  db,
  createTicketSystem,
  getTicketSystem,
  deleteTicketSystem,
  getTicketSystemAdmin,
  getTicketSystemLogChannel,
  getTicketChannel,
  checkTicketAdmin,
};
