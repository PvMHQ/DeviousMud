const Command = require("../base/Command.js");

class Purge extends Command {
  constructor (client) {
    super(client, {
      name: "purge",
      description: "Clears a channel of unwlecome messages.",
      category:"System",
      usage: "purge <#>",
      aliases: ['clear', 'delete'],
      permLevel: "Moderator"
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount) return message.reply('Must specify an amount to delete!');
    if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
      message.channel.fetchMessages({
      limit: 100,
      }).then((messages) => {
    if (user) {
      const filterBy = user ? user.id : Client.user.id;
      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
    }
    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });
  }
}

module.exports = Purge;