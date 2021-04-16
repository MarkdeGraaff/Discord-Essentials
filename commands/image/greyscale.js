const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord");

module.exports = {
    name: 'greyscale',
    description: "Turn a profile picture to a greyscale.",
    usage: '$greyscale @user',
    aliases : ['grey'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first()
        if (!user) return message.reply("Please mention a user!");
        
        const avatar = user.displayAvatarURL({ format : "png" });

        const image = await Canvas.greyscale(avatar);

        message.channel.send(new MessageAttachment(image, "image.gif"));
    },
};