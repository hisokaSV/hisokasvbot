const { Command, CommandoMessage } = require("discord.js-commando");
const Discord = require("discord.js");

const bot = new Discord.Client();

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            aliases: ['d'],
            group: 'message',
            memberName: 'clear',
            description: 'supprime un nombre de message definit `-d` + nombre choisi '
        });
    }

    /**
    * 
    * @param {CommandoMessage} message 
    * @param {String} query
    */
    
   async run(message){

        //bot.on("message", message => {

            if(message.content.startsWith("-d")){
             message.delete();
                if(message.member.hasPermission('MANAGE_MESSAGES')){

                    let args = message.content.trim().split(/ +/g);
                        
                    if(args[1]){
                        if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

                            message.channel.bulkDelete(args[1])
                        }

                    }            
                }
            }
        //})
    }
}