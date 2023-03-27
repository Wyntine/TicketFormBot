// @ts-check

const { PermissionsBitField, CommandInteraction } = require("discord.js");
const {
  yetkiYokEmbed,
  destekSıfırlamaBaşarı,
  destekRolEksik,
  destekKanalEksik,
} = require("../components/embeds");
const { deleteTicketSystem, getTicketSystem } = require("../helpers/database");

module.exports = {
  name: "destek-sistemi-sıfırla",
  description: "Destek Sistemi sıfırlarsın.",
  options: [],
  /**
   * @param {CommandInteraction} interaction
   */
  run: async (interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ embeds: [yetkiYokEmbed], ephemeral: true });
    }

    const { log, yetkili } = getTicketSystem(interaction.guild?.id);
    if (!log) return interaction.reply({ embeds: [destekRolEksik], ephemeral: true });
    if (!yetkili) return interaction.reply({ embeds: [destekKanalEksik], ephemeral: true });

    deleteTicketSystem(interaction.guild?.id);
    return interaction.reply({ embeds: [destekSıfırlamaBaşarı] });
  },
};
