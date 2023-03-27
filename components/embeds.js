// @ts-check

const { EmbedBuilder, Colors } = require("discord.js");

const yetkiYokEmbed = new EmbedBuilder()
  .setColor(Colors.Red)
  .setDescription("Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.");

const destekSıfırlamaBaşarı = new EmbedBuilder()
  .setDescription(`Destek sistemi başarıyla sıfırlandı.`)
  .setColor(Colors.Green);

const destekRolEksik = new EmbedBuilder()
  .setColor(Colors.Red)
  .setDescription("Destek yetkili rolü ayarlanmamış.");
const destekKanalEksik = new EmbedBuilder()
  .setColor(Colors.Red)
  .setDescription("Destek log kanalı ayarlanmamış.");

const destekRolAyarlı = new EmbedBuilder()
  .setColor(Colors.Red)
  .setDescription("Destek yetkili rolü zaten ayarlanmış.");
const destekKanalAyarlı = new EmbedBuilder()
  .setColor(Colors.Red)
  .setDescription("Destek log kanalı zaten ayarlanmış.");

/**
 * @param {any} kanal
 * @param {any} rol
 */
function destekBaşarıEmbed(kanal, rol) {
  return new EmbedBuilder()
    .setDescription(
      `Destek Sistemi başarıyla ayarlandı.\n\nDestek Log: ${kanal}\nDestek Yetkili: ${rol}`
    )
    .setColor(Colors.Green);
}

/**
 * @param {string | null} mesaj
 */
function destekMesajEmbed(mesaj) {
  return new EmbedBuilder().setTitle("Destek Sistemi").setDescription(mesaj).setColor(Colors.Green);
}

const açıkTalepVar = new EmbedBuilder()
  .setColor(Colors.Red)
  .setDescription("Zaten açık bir talebiniz var.");

/**
 * @param {string} userId
 * @param {string} channelName
 */
function talepSilindiLogEmbed(userId, channelName) {
  return new EmbedBuilder()
    .setTitle("Destek Sistemi")
    .setDescription(`Bir destek talebi silindi.`)
    .addFields(
      { name: `Talep Kapatan:`, value: `<@${userId}>`, inline: true },
      { name: `Kapatılan Talep:`, value: `**${channelName}**`, inline: true }
    );
}

/**
 * @param {string} userTag
 * @param {string} reason
 */
function talepOluşturulduLogEmbed(userTag, reason) {
  return new EmbedBuilder()
    .setTitle("Destek Sistemi")
    .setDescription(
      `**${userTag}** adlı kullanıcı **${reason}** nedeniyle bir destek talebi oluşturdu.`
    )
    .setColor(Colors.Green);
}

/**
 * @param {string} userId
 */
function talepEklendiEmbed(userId) {
  return new EmbedBuilder()
    .setTitle("Destek Sistemi")
    .setDescription(`<@${userId}> adlı kullanıcı destek talebine eklendi.`);
}

/**
 * @param {string} userId
 */
function talepAtıldıEmbed(userId) {
  return new EmbedBuilder()
    .setTitle("Destek Sistemi")
    .setDescription(`<@${userId}> adlı kullanıcı destek talebinden atıldı.`);
}

const destekPanelEmbed = new EmbedBuilder()
  .setTitle("Kullanıcı Paneli")
  .setDescription("Aşağıdaki butonlardan üye ekleyebilir veya çıkarabilirsin!")
  .setColor("Random");

const sahipDeğilEmbed = new EmbedBuilder()
  .setColor(Colors.Red)
  .setDescription(`🛡️ Bu talebin sahibi veya talep yetkilisi değilsiniz.`);

module.exports = {
  yetkiYokEmbed,
  destekSıfırlamaBaşarı,
  destekRolEksik,
  destekKanalEksik,
  destekRolAyarlı,
  destekKanalAyarlı,
  destekBaşarıEmbed,
  destekMesajEmbed,
  açıkTalepVar,
  talepSilindiLogEmbed,
  talepOluşturulduLogEmbed,
  talepEklendiEmbed,
  talepAtıldıEmbed,
  destekPanelEmbed,
  sahipDeğilEmbed,
};
