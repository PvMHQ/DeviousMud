const Command = require('../base/Command.js');

class Init extends Command {
    constructor (client) {
      super(client, {
        name: 'init',
        description: 'Initialize a new schedule',
        category: 'System',
        usage: 'init [<channel>|<name>]',
        guildOnly: true,
        permLevel: 'Bot Owner'
      });
    }

async run(message, args){ 
if (args.length > 1) { return message.channel.send(`That's too many arguments! Use ${this.client.getSettings(message.guild).prefix}init [<channel>|<name>]`); }
if (args.length == 1) { 
  if (args[0].match("<#[\\d]+>")){

  }else{
    if (args[0].length>100 || args[0].length<2){ return message.channel.send(`Schedule name must be between 2 and 100 characters long!`); }
  }
       }
    }
};

module.exports = Init;