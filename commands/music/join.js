const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel } = require('../../strings.json');

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            aliases: ['j'],
            group: 'music',
            memberName: 'join',
            description: 'Ajoute le bot sur votre vocal `-join` ou `-j`'
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query
     */
    async run(message) {
        const voicechannel = message.member.voice.channel;

        if (!message.member.voice.channel) {
            return message.say(UserNotInVoiceChannel);
        }

        await voicechannel.join();

        return message.say(":thumbsup: J'ai rejoins" + "`" + message.member.voice.channel.name + "`");
    }
}