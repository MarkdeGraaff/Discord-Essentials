const { Client, Message, MesageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
    name: 'translate',
    description: "Translate a message from any language.",
    usage: '$translate argument',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args.join(" ");
        if (!query) return message.reply("Please specify some text to translate.");

        const translated = await translate(query, { to : 'en'});
        message.channel.send(`${translated.text}`);
    }
}