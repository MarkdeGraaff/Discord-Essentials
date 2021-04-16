const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord");

module.exports = {
    name: 'affect',
    description: "Smoking doesn't effect my baby.",
    usage: '$affect @user',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first()
        if (!user) return message.reply("Please mention a user!");
        
        const avatar = user.displayAvatarURL({ format : "png" });

        const image = await Canvas.affect(avatar);

        message.channel.send(new MessageAttachment(image, "image.gif"));
    },
};