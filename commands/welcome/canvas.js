const { Client, Message, MessageAttachment } = require('discord.js');
const Canvas = require("discord-canvas");
module.exports = {
    name: 'canvas',
    description: "Show an example welcome image.",
    usage: '$canvas',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        const image = new Canvas.Welcome()
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)
            .setMemberCount(message.guild.memberCount)
            .setGuildName(message.guild.name)
            .setAvatar(message.author.displayAvatarURL({format : "png"}))
            .setColor("border", "#8015EA")
            .setColor("username-box", "#8015EA")
            .setColor("discriminator-box", "#8015EA")
            .setColor("message-box", "#8015EA")
            .setColor("title", "#8015EA")
            .setColor("avatar", "#8015EA")
            .setBackground(
                "https://i.imgur.com/4yAzOai.png"
                )
            .toAttachment();
       
        const attachment = new MessageAttachment(
            (await image).toBuffer(), 
            "goodbye-image.png"
            );
        
        message.channel.send(attachment);
    },
};