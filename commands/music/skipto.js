const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotNotInVoiceChannel } = require('../../strings.json');
const ytdl = require('ytdl-core');

module.exports = class SkiptoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skipto',
            aliases: ['n'],
            group: 'music',
            memberName: 'skipto',
            description: 'passe a la musique choisie',
            args: [
                {
                    key: 'index',
                    prompt: "A quelle position de la file veut tu te rendre ?",
                    type: 'integer'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query
     */
    async run(message, { index }) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;

        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }

        if (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }

        index--;

        if (!server.queue[index]) {
            server.currentVideo = {url: "", title: "Rien pour le momment !"};
            return message.say("ce titre n'a pas été trouvé dans la filed'attente");
        }        

        server.currentVideo = server.queue[index];

        server.dispatcher = server.connection.play( await ytdl(server.currentVideo.url, {filter: 'audioonly' }));
        server.queue.splice(index, 1);

        return message.say(":fast_forward: Ignoré :thumbsup:");
    }
}