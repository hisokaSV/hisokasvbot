const { UserNotInVoiceChannel,BotNotInVoiceChannel } = require('../../strings.json');
const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher } = require('discord.js');

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reprise',
            aliases: ['r'],
            group: 'music',
            memberName: 'reprise',
            description: 'Reprend la lecture de la musique en pause `-reprise` ou `-r`'
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query
     */
    async run(message) {
        /**
         * @type {StreamDispatcher} dispatcher
         */
        const dispatcher = message.client.server.dispatcher;
        
        if (!message.member.voice.channel) {
            return message.say(UserNotInVoiceChannel);
        }
        if (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }
          
        if(dispatcher){
           dispatcher.resume();
        }

        return message.say("En train de jouer :notes: ");
    }
}