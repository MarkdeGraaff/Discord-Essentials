const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord");

module.exports = {
    name: 'clyde',
    description: "Make Clyde say something.",
    usage: '$clyde argument',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const suggestionQuery = args.join(" ");
        if (!suggestionQuery) return message.reply("Please enter some text!");


        const image = await Canvas.clyde(suggestionQuery);

        message.channel.send(new MessageAttachment(image, "image.gif"));
    },
};