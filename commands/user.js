const Command = require('../base/Command.js');
const { MessageEmbed } = require("discord.js")

class User extends Command {
    constructor (client) {
      super(client, {
        name: 'user',
        description: 'Get information on a mentioned user.',
        category: 'Runescape',
        usage: 'user <@mention>',
        guildOnly: true,
        aliases: [],
        permLevel: 'User'
      });
    }

async run(message,[user]){ 
  if (!user) {
    let key = message.author.id
  const embed = new MessageEmbed()
			.setColor(16098851)
			.setThumbnail(message.member.user.displayAvatarURL)
			.setAuthor(message.member.user.username)
			.addField('RuneScape Username', this.client.userSettings.has(key,'rsn') ? this.client.userSettings.get(key,'rsn') : 'Not Set', true)
      .addField('Clan', this.client.userSettings.has(key,'clan') ? `${this.client.userSettings.get(key,'clan')} (${this.client.userSettings.get(key,'clanRank')})` : 'Not Set', true)
      return message.channel.send({ embed });
    }
  if (message.mentions.members.size === 0) return message.reply('Please mention a user to look up.');
    if (this.client.userSettings.get(key,"rsn") !== null) { 
  let key = message.mentions.members.first().id;
    const embed = new MessageEmbed()
    .setColor(16098851)
    .setThumbnail(user.displayAvatarURL)
    .setAuthor(user.username)
    .addField('RuneScape Username', this.client.userSettings.get(key,'rsn') || 'Not Set', true)
    .addField('Clan', this.client.userSettings.has(key,'clan') ? `${this.client.userSettings.get(key,'clan')} (${this.client.userSettings.get(key,'clanRank')})` : 'Not Set', true)
    return message.channel.send({ embed });
  }
}
};

module.exports = User;