const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord");

module.exports = {
    name: 'blur',
    description: "Blur someone.",
    usage: '$blur @user',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first()
        if (!user) return message.reply("Please mention a user!");

        const avatar = user.displayAvatarURL({ format : "png" });

        const image = await Canvas.blur(avatar);

        message.channel.send(new MessageAttachment(image, "image.gif"));
    },
};