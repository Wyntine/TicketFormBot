// @ts-check

const { PermissionsBitField, CommandInteraction } = require("discord.js");
const {
  yetkiYokEmbed,
  destekRolAyarlı,
  destekKanalAyarlı,
  destekBaşarıEmbed,
} = require("../components/embeds");
const { getTicketSystem, createTicketSystem } = require("../helpers/database");

module.exports = {
  name: "destek-ayarla",
  description: "Destek Sistemi ayarlarsın.",
  options: [
    { name: "yetkili-rol", description: "Bir yetkili rolü seç.", type: 8, required: true },
    { name: "log-kanalı", description: "Bir log kanalı seç.", type: 7, required: true },
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  run: async (interaction) => {
    if (!interaction.member?.permissions.has(PermissionsBitField.Flags.Administrator))
      return interaction.reply({ embeds: [yetkiYokEmbed], ephemeral: true });

    const { log, yetkili } = getTicketSystem(interaction.guild?.id);
    const rol = interaction.options.getRole("yetkili-rol");
    const kanal = interaction.options.getChannel("log-kanalı");

    if (yetkili) return interaction.reply({ embeds: [destekRolAyarlı], ephemeral: true });
    if (log) return interaction.reply({ embeds: [destekKanalAyarlı], ephemeral: true });

    createTicketSystem(interaction.guild?.id, rol.id, kanal.id);
    return interaction.reply({ embeds: [destekBaşarıEmbed(kanal, rol)] });
  },
};
