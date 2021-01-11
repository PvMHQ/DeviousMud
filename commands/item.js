const Command = require('../base/Command.js');
const {MessageEmbed} = require("discord.js")
const osrs = require('osrs-wrapper');

class item extends Command {
    constructor (client) {
      super(client, {
        name: 'item',
        description: 'Displays the stats of an OSRS account.',
        category: 'Runescape',
        usage: 'item <name>',
        guildOnly: true,
        aliases: ['item'],
        permLevel: 'Bot Owner'
      });
    }

async run(message, args){ 
  const item = await osrs.ge.getItem(args.join(' ')).catch(() => {
    throw message.channel.send(`No item info for: ${args.slice(0).join(' ')}. Please try again later.`);
  });
  const iteminfo = JSON.parse(item)
  const embed = new MessageEmbed()
  .setColor(16098851)
  .setThumbnail(iteminfo.item.icon)
  .setDescription(`Item: [${iteminfo.item.name}](http://services.runescape.com/m=itemdb_oldschool/viewitem?obj=${+iteminfo.item.id})
  Examine: ${iteminfo.item.description}\nGE Average: ${iteminfo.item.current.price} Limit: `)
  return message.channel.send(embed);
    }
};

module.exports = item;