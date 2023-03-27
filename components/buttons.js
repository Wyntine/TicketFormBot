// @ts-check

const { ButtonBuilder, ButtonStyle } = require("discord.js");

/**
 * @param {string} label
 */
function ticketButton(label) {
  return new ButtonBuilder().setLabel(label).setStyle(ButtonStyle.Primary).setCustomId("ticket");
}

const destekEkleButon = new ButtonBuilder()
  .setLabel("Ekle")
  .setStyle(ButtonStyle.Success)
  .setCustomId("ekle");
const destekÇıkarButon = new ButtonBuilder()
  .setLabel("Çıkar")
  .setStyle(ButtonStyle.Danger)
  .setCustomId("çıkar");
const destekSilButon = new ButtonBuilder()
  .setLabel("Sil")
  .setStyle(ButtonStyle.Secondary)
  .setCustomId("sil");

module.exports = {
  ticketButton,
  destekEkleButon,
  destekÇıkarButon,
  destekSilButon,
};
