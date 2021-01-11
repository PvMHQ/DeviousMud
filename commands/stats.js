const Command = require('../base/Command.js');
const {MessageEmbed} = require("discord.js")
const {getSkillName,combatLevel} = require('../util/apis/Runescape')
const osrs = require('osrs-wrapper');
const Table = require('cli-table3');


class Stats extends Command {
    constructor (client) {
      super(client, {
        name: 'stats',
        description: 'Displays the stats of an OSRS account.',
        category: 'Runescape',
        usage: 'stats <rsn>',
        guildOnly: true,
        aliases: ['s'],
        permLevel: 'User'
      });
    }

async run(message, args){ 
  const player = await osrs.hiscores.getPlayer(args[0]?args.join(' '):this.client.userSettings.get(message.author.id,'rsn')).catch(() => {
    throw message.channel.send(this.client.notFound);
  });
  let table = new Table({head: ['',{hAlign:'center',content:'Rank'},{hAlign:'center',content:'Level'},{hAlign:'center',content:'XP'}],colWidths:[12,9,6,13],style:{'padding-left': 0, 'padding-right': 0,head:[],border:[]},chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''}}); 
  for (let i = 1; i < 24; i++) {
   var unranked = player.Skills[getSkillName(i)].rank == -1;
   if(!unranked) { table.push([getSkillName(i),{hAlign: 'right', content:`${player.Skills[getSkillName(i)].rank.toLocaleString()}`},{hAlign: 'center', content:`${player.Skills[getSkillName(i)].level}`},{hAlign: 'right', content:`${player.Skills[getSkillName(i)].xp.toLocaleString()}`}]);}
  };
  //const otherStats = `
 // <:bountyhunterhunter:608378296153145355> ${player.Minigames.Bounty_Hunter.score>0?player.Minigames.Bounty_Hunter.score.toLocaleString():'-'} <:bountyhunterrogue:608378365388259389> ${player.Minigames.Bounty_Hunter_Rogues.score>0?player.Minigames.Bounty_Hunter_Rogues.score.toLocaleString():'-'} <:lmsrank:608378388612120612> ${player.Minigames.LMS.score>0?player.Minigames.LMS.score.toLocaleString():'-'} 
 // <:cluescrollsbeginner:608367813828149260> ${player.Minigames.Clue_Scrolls_Beginner.score>0?player.Minigames.Clue_Scrolls_Beginner.score.toLocaleString():'-'} <:cluescrollseasy:608367453050896411> ${player.Minigames.Clue_Scrolls_Easy.score>0?player.Minigames.Clue_Scrolls_Easy.score.toLocaleString():'-'} <:cluescrollsmedium:608367467621908513> ${player.Minigames.Clue_Scrolls_Medium.score>0?player.Minigames.Clue_Scrolls_Medium.score.toLocaleString():'-'} 
 // <:cluescrollshard:608367530448388277> ${player.Minigames.Clue_Scrolls_Hard.score>0?player.Minigames.Clue_Scrolls_Hard.score.toLocaleString():'-'} <:cluescrollselite:608367512320737280> ${player.Minigames.Clue_Scrolls_Elite.score>0?player.Minigames.Clue_Scrolls_Elite.score.toLocaleString():'-'} <:cluescrollsmaster:608368382777229353> ${player.Minigames.Clue_Scrolls_Master.score>0?player.Minigames.Clue_Scrolls_Master.score.toLocaleString():'-'}
 // `
  const embed = new MessageEmbed()
      .setColor(0x962a00)
      .setThumbnail('https://i.imgur.com/wdezZxA.png')
      .setTitle(`Stats for ${args[0]?args.join(' '):this.client.userSettings.get(message.author.id,'rsn')}`)
      .setDescription('```css\n' + table.toString() + '```')
      //.addField(`Other`,otherStats, true)
      .addField(`Overall`,`**Rank:** ${player.Skills.Overall.rank.toLocaleString()}\n**Level:** ${player.Skills.Overall.level}\n**XP:** ${player.Skills.Overall.xp.toLocaleString()}\n**Combat Level:** ${await combatLevel(player.Skills)}`,true)
      return message.channel.send(embed);
    }
};

module.exports = Stats;