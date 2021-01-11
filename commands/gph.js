const Command = require('../base/Command.js');

class gph extends Command {
    constructor (client) {
      super(client, {
        name: 'gph',
        description: 'Displays the gp\\h of a given boss.',
        category: 'Runescape',
        usage: 'gph <name>',
        guildOnly: true,
        permLevel: 'Bot Owner'
      });
    }

async run(message, args){ 

    }
};

module.exports = gph;