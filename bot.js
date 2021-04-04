const { CommandoClient } = require('discord.js-commando');
const path = require('path');
/*const { token } = require('./config.json'); */

const client = new CommandoClient({
    /*commandPrefix: '-',
    owner:'281522466302722059',
    invite: 'https://discord.gg/38bUCtxb'*/
    commandPrefix: process.env.prefix,
    owner: process.env.ownerID,
    invite: process.env.inv
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music', 'Music')
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.server ={
    queue: [],
    currentVideo: {title: "", url: "" },
    dispatcher: null
};

client.once('ready', () => {
    console.log(`connecté en tant que ${client.user.tag} -  (${client.user.id})`);
})

client.on('error', (error) => console.error(error));

client.login(process.env.TOKEN);