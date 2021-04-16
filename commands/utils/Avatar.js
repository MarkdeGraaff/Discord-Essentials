const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: "Get a users avatar.",
    usage: '$avatar @user',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        message.channel.send(
            new MessageEmbed()
                .setTitle(`${member.user.tag}'s avatar`)
                .setImage(member.user.displayAvatarURL({dynamic : true, size : 512}))
                .setColor("RANDOM")
        );
    },
};