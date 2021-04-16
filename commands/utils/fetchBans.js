const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'fetch-bans',
    description: "Get every banned user from the current guild - BAN MEMBERS perm.",
    usage: '$re-vc @user',
    aliases: ['rv'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        
            if(!message.member.permissions.has("BAN_MEMBERS")) return;

            const fetchBans = message.guild.fetchBans();
            const bannedMembers = (await fetchBans)
                .map((member) => `\`${member.user.tag}\``)
                .join(" ");
            
            if(bannedMembers === ""){
                message.channel.send("There have been no users banned yet!");
            } else {
                message.channel.send(bannedMembers);                
            };
    },
};