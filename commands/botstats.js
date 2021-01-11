const Command = require("../base/Command.js");
const Discord = require("discord.js")
const moment = require('moment');
const { version: discordVersion } = require('discord.js');
var config = require('../config.js');

class bStats extends Command {
  constructor (client) {
    super(client, {
      name: "bstats",
      category: "System",
      description: "Displays more advanced statistics about the bot.",
      usage: "bstats",
      deleteAfter: true,
      aliases: ["bstat"],
      permLevel: "Bot Owner"
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars

    const g = {
      tiny: 0,
      small: 0,
      average: 0,
      large: 0,
      massive: 0,
      botfarms: 0,
      total: 0
    };
  
    let largest = this.client.guilds.cache.first();
  
    for (const guild of this.client.guilds.cache.values()) {
      if (guild.memberCount < 25) g.tiny++;
      else if (guild.memberCount < 100) g.small++;
      else if (guild.memberCount < 500) g.average++;
     else if (guild.memberCount < 1000) g.large++;
      else g.massive++;
  
      if (guild.members.cache.filter(u => u.user.bot).size / guild.memberCount * 100 > 70) {
        guild.botfarms++;
      }
      g.total += guild.memberCount;
     if (guild.memberCount > largest.memberCount) largest = guild;
    }
  
    g.average = Math.floor(g.total / this.client.guilds.cache.size);
    g.largest = largest.name;
  
    const guildStats = `
  • Tiny: ${g.tiny}
  • Small: ${g.small}
  • Average: ${g.average}
  • Large: ${g.large}
  • Massive: ${g.massive}
  
  • Total Servers: ${this.client.guilds.cache.size}
  • Bot Farms: ${g.botfarms}`;
  
    const otherStats = `
    • ID: ${this.client.user.id}
    • Discord.js v${discordVersion}
    • Node.js ${process.version}
    • Creation Date ${moment(this.client.user.createdAt).format('DD/MM/YY')}
    
    ${this.client.commands.size} Commands
    Created by ${this.client.appInfo.owner.username}
    [Invite Link](http://invite.pvmhq.com 'Discord only')
    `;
    function msToTime(duration) {
      var seconds = parseInt((duration/1000)%60),
          minutes = parseInt((duration/(1000*60))%60),
          hours = parseInt((duration/(1000*60*60))%24);
  
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
  
      return hours + ":" + minutes + ":" + seconds;
  }
  let embed = new Discord.MessageEmbed()
      .setColor(14981973)
      .setThumbnail(this.client.user.displayAvatarURL)
      .addField('Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
      .addField('Uptime', `${msToTime(this.client.uptime)}`, true)
      .addField('Servers', guildStats, true)
      .addField('Other Stats', otherStats, true)
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL);
      message.channel.send(embed);
  };
}

module.exports = bStats;
