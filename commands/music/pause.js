const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher } = require('discord.js');

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            aliases: ['c'],
            group: 'music',
            memberName: 'pause',
            description: 'met la lecture en pause',
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query
     */
    async run(message) {
        /**
         * @type StreamDispatcher
         */
         const dispatcher = message.client.server.dispatcher;

        if (!message.member.voice.channel) {
            return message.say(':x: Tu dois ètre dans un salon vocal pour utiliser cette commande :x:');
        }

        if (!message.client.voice.connections.first()) {
            return message.say(":x: Je ne suis pas connecté a un salon vocal. Tape `join` pour m'ajouter :x:")
        }
          
        if(dispatcher){
           dispatcher.pause();
        }

        return message.say(":pause_bouton: Pause :thumbsup:");
    }
}