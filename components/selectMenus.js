// @ts-check

const { StringSelectMenuBuilder } = require("discord.js");

const destekFormSelect = new StringSelectMenuBuilder()
  .setCustomId("del")
  .setPlaceholder("Bilet Menüsü!")
  .addOptions([
    {
      label: "Destek Sil",
      description: "Destek Kanalını silersin",
      value: "delete",
    },
    {
      label: "Üye Ekle/Üye Çıkar",
      description: "Destek talebine üye ekleyip çıkarırsın.",
      value: "panel",
    },
  ]);

module.exports = {
  destekFormSelect,
};
