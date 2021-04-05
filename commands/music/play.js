const { UserNotInVoiceChannel } = require('../../strings.json');
const {VoiceConnection} = require('discord.js');
const { Command, CommandoMessage } = require("discord.js-commando");
const { key } = require('../../config.json');

const ytdl = require('ytdl-core');
const ytsr = require('youtube-search');


module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            group: 'music',
            memberName: 'play',
            description: 'lis une musique depuis YouTube `-play` ou `-p` + url YouTube',
            args: [
                {
                    key: 'term',
                    prompt: 'Quel musique veux tu ecouter ?',
                    type: 'string',
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query
     */
    async run(message, { term }) {
        const server = message.client.server;

        if (!message.member.voice.channel) {
            return message.say(UserNotInVoiceChannel);
        }

        await message.member.voice.channel.join().then((connection) => {

            ytsr(term, { key: key, maxResults: 1, type: 'video' }).then((results) => {
                if (results.results[0]) {
                    const foundVideo = {url: results.results[0].link, title: results.results[0].title };

                    if (server.currentVideo.url != "") {
                        server.queue.push(foundVideo);
                        return message.say("`" + foundVideo.title + "`" + " - Ajouté à la file d'attente");
                    }
                    server.currentVideo = foundVideo;
                    this.runVideo(message, connection);

                }    
            });
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {VoiceConnection} connection 
     * @param {*} video 
     */
    async runVideo(message, connection) {
        const server = message.client.server;

        const dispatcher = connection.play(ytdl(server.currentVideo.url, {filter: 'audioonly' }));

        server.queue.shift();
        server.dispatcher = dispatcher;
        server.connection = connection;

        dispatcher.on('finish', () => {
            if (server.queue[0]) {
                server.currentVideo = server.queue[0];
                return this.runVideo(message, connection, server.currentVideo.url);              
            }
            else message.member.voice.channel.leave();
        });

        return message.say("En train de jouer" + "`" + server.currentVideo.title + "`" + ":notes:");
    }
}