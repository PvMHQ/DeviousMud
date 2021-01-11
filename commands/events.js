const Command = require('../base/Command.js');

class Events extends Command {
    constructor (client) {
      super(client, {
        name: 'events',
        description: 'Lists all events for the guild',
        category: 'System',
        usage: 'events',
        aliases: ['event'],
        guildOnly: true,
        permLevel: 'Bot Owner'
      });
    }

async run(message, [action, ...value], level){ 
if (action === "create") {
  const index = 0;
  const joinedValue = value.join(" ");
  console.log(joinedValue);
  if (joinedValue.length < 4) { return message.channel.send(`Use ${this.client.getSettings(message.guild).prefix}event create <channel> <title> <start> [<end> <extra>]`); }
}
    }
};

module.exports = Events;