const Command = require("../base/Command.js");

class invite extends Command {
  constructor (client) {
    super(client, {
      name: 'invite',
      description: 'Show the link to invite the bot to your server.',
      usage: 'invite',
      guildOnly: false
    });
  }

  async run (message) {
    message.reply(`http://invite.pvmhq.com`);
  }
}

module.exports = invite;
