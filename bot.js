const { token } = require('./config.json');
const { Client, Intents } = require('discord.js');
const e = require('express');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
})
const GUILD_ID = '972406976300593172';
const ROLE_VIP_ID = '972427150953168897'
const MEMBER_ID = '972407699130183700'
const CHANNEL_ID = '972406976300593175'

client.once('ready', async () => {
	console.log(`Ready!`);
    const guild = client.guilds.cache.get(GUILD_ID);
    const channel = guild.channels.cache.get(CHANNEL_ID);
    const role = guild.roles.cache.get(ROLE_VIP_ID);
    const member = await guild.members.fetch(MEMBER_ID);
    console.log('member', member);
    member.roles.add(role);
    // member.roles.remove(role);
    channel.send('bot start');
    
});

client.on('messageCreate', async (msg) => {
    if(msg.author.bot) return;
    console.log('msg.content', msg.content)
    msg.reply('응~맞아')
})

client.login(token);
console.log('login')