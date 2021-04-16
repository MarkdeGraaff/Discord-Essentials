const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: 'binary',
    description: 'Convert some text to binary or reverse!',
    usage: '$binary (encode/decode) argument',
    aliases : ['bin'],
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
            const { data } = await axios.get(`https://some-random-api.ml/binary?text=${encodeURIComponent(
                word
                )}`
            );

            message.channel.send(data.binary ?? 'An error occured', {
                code : "",
            });

        } else if (query === 'decode') {
            if (!word) 
                return message.reply('Please specify a binary string to decode.');
            const { data } = await axios.get(`https://some-random-api.ml/binary?decode=${encodeURIComponent(
                word
                )}`
            );

            message.channel.send(data.text ?? 'An error occured', {
                code : "",
            });
        } else return message.reply('That is not a valid argument, choose either decode or encode!')
    },
};