const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'check-bal',
    aliases: ['cb'],
    description: "Dit is een test!!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        console.log("test");
    }
}