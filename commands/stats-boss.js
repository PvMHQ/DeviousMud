const Command = require('../base/Command.js');
const {MessageEmbed} = require("discord.js")
const {getBossName,efficentHoursBossed} = require('../util/apis/Runescape')
const osrs = require('osrs-wrapper');
const Table = require('cli-table3');

class bossStats extends Command {
    constructor (client) {
      super(client, {
        name: 'stats-boss',
        description: 'Displays the Boss stats of an OSRS account.',
        category: 'Runescape',
        usage: 'bhs <rsn>',
        guildOnly: true,
        aliases: ['bs','bhs','ehb'],
        permLevel: 'Bot Owner'
      });
    }

async run(message, args){ 
  const player = await osrs.hiscores.getPlayer(args[0]?args.join(' '):this.client.userSettings.get(message.author.id,'rsn')).catch(() => {
    throw message.channel.send(this.client.notFound);
  });
  let table = new Table({head: ['',{hAlign:'center',content:'Rank'},{hAlign:'center',content:'Kills'}],colWidths:[27,9,6],style:{'padding-left': 0, 'padding-right': 0,head:[],border:[]},chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''}}); 
  for (let i = 0; i < 41; i++) {
    console.log(player.Bosses[i])
   // var unranked = player.Bosses[i].name == -1;
   // if(!unranked) { table.push([[i].name,{hAlign: 'right', content:`${player.Bosses[i].rank.toLocaleString()}`},{hAlign: 'center', content:`${player.Bosses[i].kills}`}]);}
  };

  const otherStats = `
  EHB: ${await efficentHoursBossed(player.Bosses)}
  `

  const embed = new MessageEmbed()
      .setColor(0x962a00)
      //.setThumbnail('https://i.imgur.com/wdezZxA.png')
      .setTitle(`Boss Stats for ${args[0]?args.join(' '):this.client.userSettings.get(message.author.id,'rsn')}`)
      .setDescription('```css\n' + table.toString() + '```')
      .addField(`Other`,otherStats, true)
      return message.channel.send(embed);
    }
};

module.exports = bossStats;