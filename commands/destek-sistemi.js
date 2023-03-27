// @ts-check

const { PermissionsBitField, CommandInteraction } = require("discord.js");
const {
  destekRolEksik,
  destekKanalEksik,
  destekMesajEmbed,
  yetkiYokEmbed,
} = require("../components/embeds");
const { ticketRow } = require("../components/rows");
const { getTicketSystem } = require("../helpers/database");

module.exports = {
  name: "destek-sistemi",
  description: "Destek Sistemi ayarlarsın.",
  options: [
    { name: "embed-mesaj", description: "Bir embed mesaj gir.", type: 3, required: true },
    { name: "buton-mesaj", description: "Bir buton mesaj gir.", type: 3, required: true },
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  run: async (interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
      return interaction.reply({ embeds: [yetkiYokEmbed], ephemeral: true });

    const { log, yetkili } = getTicketSystem(interaction.guild?.id);
    const mesaj = interaction.options.getString("embed-mesaj");
    const buton = interaction.options.getString("buton-mesaj");

    if (!yetkili) return interaction.reply({ embeds: [destekRolEksik], ephemeral: true });
    if (!log) return interaction.reply({ embeds: [destekKanalEksik], ephemeral: true });

    return interaction.reply({ embeds: [destekMesajEmbed(mesaj)], components: [ticketRow(buton)] });
  },
};
