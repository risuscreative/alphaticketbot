const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ChannelType, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js")
const wixua = require("croxydb");

module.exports = {
    name: "kur",
    description: "risus görme burayı tamam mı?",
    type: 1,
    options: [],
run: async (client, interaction) => {

const embed = new EmbedBuilder()
.setDescription("Sen risus musun amk?")

    if(interaction.user.id !== "979762331879895102"){
        return interaction.reply({embeds: [embed]});
  }

  const kurdu = new EmbedBuilder()
  .setDescription("sistem kuruldu")

  interaction.reply({embeds: [kurdu], ephemeral: true});

  const row = new ActionRowBuilder()
  .addComponents(
      new StringSelectMenuBuilder()
          .setCustomId('select')
          .setPlaceholder('Hiçbir şey seçilmedi')
          .addOptions(
              {
                  label: 'Moderasyon',
                  //emoji: "<:badge_staff:1009089500737196092>",
                  description: 'Moderasyon komutlarını sana gösterir.',
                  value: 'mta',
              },
              {
                  label: 'Kullanıcı',
                  //emoji: "<:icons_Person:1009121744642134127>",
                  description: 'Kullanıcı komutlarını sana gösterir.',
                  value: 'tasarım',
              },
              {
                  label: 'Eğlence',
                  //emoji: "<a:emoji_1:1032946250334621707>",
                  description: 'Eğlence komutlarını sana gösterir.',
                  value: 'destek',
              },
          ),
  );
  const embed2 = new EmbedBuilder()
  .setDescription("Ticket açmak için menü açabilirsin")
  .setColor("Blue")

  interaction.channel.send({embeds: [embed2], components: [row]})

  const { user, customId, guild } = interaction;

  const category = await guild.channels.create({
    name: 'Logo Tasarımları',
    type: ChannelType.GuildCategory,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
    ],
  });
  const category2 = await guild.channels.create({
    name: 'Animasyon Tasarımları',
    type: ChannelType.GuildCategory,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
    ],
  });
  const category3 = await guild.channels.create({
    name: 'Thumbail Tasarımları',
    type: ChannelType.GuildCategory,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
    ],
  });

  wixua.set(`category_${interaction.guild.id}`, { category: category.id, category2: category2.id, category3: category3.id});

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isStringSelectMenu()) {
    const selectedOption = interaction?.values[0];
    if (selectedOption === "mta") {
      const { user, customId, guild } = interaction;
  
      const isChannel = await interaction.guild.channels.cache.find(
        (ch) => ch.name === `ticket-${user.tag}`
      );
      if (isChannel) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription(
                `**Başarısız!** Zaten Aktif Bir Kanaal Var! *[Daha fazla bilgi](https://discordapp.com/channels/${interaction.guild.id}/${isChannel.id})*`
              ),
          ],
          ephemeral: true,
        });
      }
      const channel = await guild.channels.create({
        name: `ticket-${user.tag}`,
        type: ChannelType.GuildText,
        parent: category.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });
  
      wixua.get(`category_${interaction.guild.id}`, { category: category.id });
  
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`kapat2`)
          .setLabel("Destek kapatılsın.")
          .setEmoji("❌")
          .setStyle(ButtonStyle.Secondary)
      );
  
      const embed = new EmbedBuilder()
        .setDescription("hoşgeldin..")
        .setColor("DarkButNotBlack");
  
      interaction.reply({
        content: `✅ |** Senin için bir tane destek kanalı oluşturdum**`,
        ephemeral: true,
      });
      const chnlMessage = await channel.send({
        content: "Yetkililer en kısa zamanda sizinle ilgilenecektir.",
        embeds: [embed],
        components: [row],
      });
  
      return chnlMessage.pin();
    }
    if (selectedOption === "tasarım") {
      const { user, customId, guild } = interaction;
  
      const isChannel = await interaction.guild.channels.cache.find(
        (ch) => ch.name === `ticket-${user.tag}`
      );
      if (isChannel) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription(
                `**Başarısız!** Zaten Aktif Bir Kanaal Var! *[Daha fazla bilgi](https://discordapp.com/channels/${interaction.guild.id}/${isChannel.id})*`
              ),
          ],
          ephemeral: true,
        });
      }
  
      wixua.get(`category_${interaction.guild.id}`, { category2: category2.id });
      wixua.set(`kanal_${guild.id}`, { userId: user.id });
      const channel = await guild.channels.create({
        name: `ticket-${user.tag}`,
        type: ChannelType.GuildText,
        parent: category2.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });
  
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`kapat3`)
          .setLabel("Destek kapatılsın.")
          .setEmoji("❌")
          .setStyle(ButtonStyle.Secondary)
      );
  
      const embed = new EmbedBuilder()
        .setDescription("hoşgeldin..")
        .setColor("DarkButNotBlack");
  
      interaction.reply({
        content: `✅ |** Senin için bir tane destek kanalı oluşturdum**`,
        ephemeral: true,
      });
      const chnlMessage = await channel.send({
        content: "Yetkililer en kısa zamanda sizinle ilgilenecektir.",
        embeds: [embed],
        components: [row],
      });
  
      return chnlMessage.pin();
    }
  
    if (selectedOption === "destek") {
      const { user, customId, guild } = interaction;
  
      const isChannel = await interaction.guild.channels.cache.find(
        (ch) => ch.name === `ticket-${user.tag}`
      );
      if (isChannel) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription(
                `Zaten Aktif Bir Kanal mevcut! *[Destek talebiniz](https://discordapp.com/channels/${interaction.guild.id}/${isChannel.id})*`
              ),
          ],
          ephemeral: true,
        });
      }
      wixua.get(`category_${interaction.guild.id}`, { category3: category3.id });
      wixua.set(`kanal_${guild.id}`, { userId: user.id });
      const channel = await guild.channels.create({
        name: `ticket-${user.tag}`,
        type: ChannelType.GuildText,
        parent: category3.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });
  
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`kapat`)
          .setLabel("Destek kapatılsın.")
          .setEmoji("❌")
          .setStyle(ButtonStyle.Secondary)
      );
  
      const embed = new EmbedBuilder()
        .setDescription("hoşgeldin..")
        .setColor("DarkButNotBlack");
  
      interaction.reply({
        content: `✅ |** Senin için bir tane destek kanalı oluşturdum**`,
        ephemeral: true,
      });
      const chnlMessage = await channel.send({
        content: "Yetkililer en kısa zamanda sizinle ilgilenecektir.",
        embeds: [embed],
        components: [row],
      });
  
      return chnlMessage.pin();
    }
  }
    if (interaction.isButton()) {
    if (interaction.customId === "kapat2") {
      interaction.channel.delete();
    }
  
    }
  });
  
    }
}