const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'create',
    description: "Create a channel - CREATE CHANNEL perm.",
    usage: '$create argument',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.member.permissions.has('MANAGE_CHANNELS')) 
            return message.reply("You do not have permission to do this!");

            const channelNameQuery = args.join(" ");
            if (!channelNameQuery)
                return message.reply("Please specify a channel name!");

            message.guild.channels.create(channelNameQuery).then((ch) => {
                message.channel.send(`Click ${ch} to acces the newly created channel!`);
            });
    },
};