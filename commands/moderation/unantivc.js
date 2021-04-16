const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 're-vc',
    description: "Make someone able to join a vc again.",
    usage: '$re-vc @user',
    aliases: ['rv'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
       const target = message.mentions.members.first();
       if(!target) return message.reply("Please specify a target!");

       const role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
        if(!role) return message.reply("The role doesn't exist!");

        if (!target.roles.cache.has(role.id)) return message.reply(`${target} is not anti-vced!`);

        target.roles.remove(role.id);
        message.channel.send(`${target} is now able to join a vc again!`)
        target.send(`${target} You will be able to join a vc again in ${message.guild}.`)
    },
};