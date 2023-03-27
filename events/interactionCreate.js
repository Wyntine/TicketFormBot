// @ts-check

const { PermissionsBitField, ChannelType } = require("discord.js");
const {
  açıkTalepVar,
  talepSilindiLogEmbed,
  talepOluşturulduLogEmbed,
  talepEklendiEmbed,
  talepAtıldıEmbed,
  destekPanelEmbed,
  sahipDeğilEmbed,
} = require("../components/embeds");
const { destekModal, üyeEkleModal, üyeÇıkarModal } = require("../components/modals");
const { destekPanelRow, destekFormRow } = require("../components/rows");
const { getCommand } = require("../helpers/commandSystem");
const {
  getTicketSystemLogChannel,
  getTicketSystemAdmin,
  checkTicketAdmin,
} = require("../helpers/database");

/**
 * @param {import("discord.js").Interaction} interaction
 */
module.exports = async (interaction) => {
  const channel = interaction.channel;
  const guild = interaction.guild;
  const user = interaction.user;
  const client = interaction.client;

  if (!guild || !channel || channel.isDMBased() || channel.isVoiceBased() || channel.isThread())
    return;

  if (interaction.isChatInputCommand()) {
    const command = getCommand(interaction.commandName, "command");
    if (command) command.run(interaction);
  } else if (interaction.isButton()) {
    switch (interaction.customId) {
      case "ticket": {
        return await interaction.showModal(destekModal);
      }
      case "ekle": {
        if (!checkTicketAdmin(interaction))
          return interaction.reply({ embeds: [sahipDeğilEmbed], ephemeral: true });
        return await interaction.showModal(üyeEkleModal);
      }
      case "çıkar": {
        if (!checkTicketAdmin(interaction))
          return interaction.reply({ embeds: [sahipDeğilEmbed], ephemeral: true });
        return await interaction.showModal(üyeÇıkarModal);
      }
      case "sil": {
        if (!checkTicketAdmin(interaction))
          return interaction.reply({ embeds: [sahipDeğilEmbed], ephemeral: true });
        const log = getTicketSystemLogChannel(guild.id);
        channel.delete();
        return client.channels.cache
          .get(`${log}`)
          ?.send({ embeds: [talepSilindiLogEmbed(user.id, channel.name)] });
      }
    }
  } else if (interaction.isModalSubmit()) {
    switch (interaction.customId) {
      case "form": {
        const sebep = interaction.fields.getTextInputValue("sebep");
        const yetkili = getTicketSystemAdmin(guild.id);
        const roleStaff = guild.roles.cache.get(yetkili);
        const talepKanal = guild.channels.cache.find((c) => "topic" in c && c.topic === user.id);
        if (talepKanal) return interaction.reply({ embeds: [açıkTalepVar], ephemeral: true });

        const overwrites = [
          { id: guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
          { id: user.id, allow: [PermissionsBitField.Flags.ViewChannel] },
        ];

        if (roleStaff)
          overwrites.push({ id: roleStaff.id, allow: [PermissionsBitField.Flags.ViewChannel] });
        const yeniKanal = await guild.channels.create({
          name: `destek-${user.username}`,
          type: ChannelType.GuildText,
          permissionOverwrites: overwrites,
          topic: user.id,
        });

        await yeniKanal.send({
          embeds: [talepOluşturulduLogEmbed(user.tag, sebep)],
          content: roleStaff ? `${roleStaff.toString()} | ${user.toString()}` : user.toString(),
          components: [destekFormRow],
        });
        return interaction.reply({
          content: `Biletiniz başarıyla açıldı. <#${yeniKanal.id}>`,
          ephemeral: true,
        });
      }
      case "eklemenu": {
        if (!checkTicketAdmin(interaction))
          return interaction.reply({ embeds: [sahipDeğilEmbed], ephemeral: true });
        const id = interaction.fields.getTextInputValue("uyeid");
        channel.permissionOverwrites.create(id, { ViewChannel: true });
        return interaction.reply({ embeds: [talepEklendiEmbed(id)] });
      }
      case "eklemenu2": {
        if (!checkTicketAdmin(interaction))
          return interaction.reply({ embeds: [sahipDeğilEmbed], ephemeral: true });
        const id = interaction.fields.getTextInputValue("cikarid");
        channel.permissionOverwrites.create(id, { ViewChannel: false });
        return interaction.reply({ embeds: [talepAtıldıEmbed(id)] });
      }
    }
  } else if (interaction.isAnySelectMenu()) {
    switch (interaction.customId) {
      case "del": {
        switch (interaction.values[0]) {
          case "delete": {
            if (!checkTicketAdmin(interaction))
              return interaction.reply({ embeds: [sahipDeğilEmbed], ephemeral: true });
            const log = getTicketSystemLogChannel(guild.id);
            channel.delete();
            return client.channels.cache
              .get(`${log}`)
              ?.send({ embeds: [talepSilindiLogEmbed(user.id, channel.name)] });
          }
          case "panel": {
            if (!checkTicketAdmin(interaction))
              return interaction.reply({ embeds: [sahipDeğilEmbed], ephemeral: true });
            await interaction.deferUpdate();
            const message = await channel.messages.fetch(interaction.message.id);
            return message.edit({ embeds: [destekPanelEmbed], components: [destekPanelRow] });
          }
        }
      }
    }
  }
};
