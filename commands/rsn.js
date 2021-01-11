const Command = require('../base/Command.js');

class rsn extends Command {
    constructor (client) {
      super(client, {
        name: 'rsn',
        description: 'Set your RuneScape Username, used for other commands.',
        category: 'Runescape',
        usage: 'rsn <rsn>',
        guildOnly: true,
        aliases: [],
        permLevel: 'User'
      });
    }

async run(message,[RSN]){ 
  const key = message.author.id; 
        this.client.userSettings.ensure(key, {
          rsn: 0,
          clan: 0,
          clanRank: 0
        });
  if (!RSN) return message.channel.send(`Your current RSN is: \`${this.client.userSettings.get(key,"rsn")}\``);
  if (!RSN.match('^[A-Za-z0-9]{1}[A-Za-z0-9 -_\u00A0]{0,11}$')) throw message.reply('Invalid username');
  if (this.client.userSettings.get(key,"rsn") == RSN) throw message.reply(`Your RSN is already \`${this.client.userSettings.get(key,"rsn")}\``);
  if (this.client.userSettings.get(key,"rsn") !== null) {
    const previousRSN = this.client.userSettings.get(key,"rsn");
    await this.client.userSettings.setProp(key,"rsn",RSN);
    return message.channel.send(`Your RSN has been set from \`${previousRSN}\` to \`${this.client.userSettings.get(key,"rsn")}\``);
  }
  await this.client.userSettings.setProp(`${message.author.id}`,"rsn",RSN);
  return message.channel.send(`Your RSN has been set to: \`${this.client.userSettings.get(`${message.author.id}`,"rsn")}\``);
}

};

module.exports = rsn;