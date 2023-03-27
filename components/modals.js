// @ts-check

const { ModalBuilder } = require("@discordjs/builders");
const { üyeÇıkarRow, üyeEkleRow, destekSebepRow } = require("./rows");

const destekModal = new ModalBuilder()
  .setCustomId("form")
  .setTitle("Destek Sistemi!")
  .addComponents(destekSebepRow);
const üyeEkleModal = new ModalBuilder()
  .setCustomId("eklemenu")
  .setTitle("Destek Sistemi")
  .addComponents(üyeEkleRow);
const üyeÇıkarModal = new ModalBuilder()
  .setCustomId("eklemenu2")
  .setTitle("Destek Sistemi")
  .addComponents(üyeÇıkarRow);

module.exports = {
  destekModal,
  üyeEkleModal,
  üyeÇıkarModal,
};
