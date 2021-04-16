const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: 'base64',
    description: 'Convert some text to base64 or reverse!',
    usage: '$base64 (encode/decode) argument',
    aliases : ['b64'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.reply("Please specify wether you'd like to encode or decode.");

        const query = args.shift().toLowerCase();
        let word = args.join(" ");

        if (query === 'encode') {
            if(!word) return message.reply('Please specify a word to encode.');
            const { data } = await axios.get(`https://some-random-api.ml/base64?encode=${encodeURIComponent(
                word
                )}`
            );

            message.channel.send(data.base64 ?? 'An error occured', {
                code : "",
            });

        } else if (query === 'decode') {
            if (!word) 
                return message.reply('Please specify a binary string to decode.');
            const { data } = await axios.get(`https://some-random-api.ml/base64?decode=${encodeURIComponent(
                word
                )}`
            );

            message.channel.send(data.text ?? 'An error occured', {
                code : "",
            });
        } else return message.reply('That is not a valid argument, choose either decode or encode!')
    },
};