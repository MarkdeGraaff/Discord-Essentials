const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'delete',
    description: "Delete a channel - DELETE CHANNEL perm.",
    usage: '$delete argument',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.member.permissions.has('MANAGE_CHANNELS')) 
            return message.reply("You do not have permission to do this!");

        const channelTarget = message.mentions.channels.first() || message.channel;

        channelTarget.delete().then((ch) => {
            message.author.send(`Channel has been deleted!`)
        });
    },
};