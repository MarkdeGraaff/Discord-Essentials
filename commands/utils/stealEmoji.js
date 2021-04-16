const { Client, Message, Util } = require('discord.js');

module.exports = {
    name: 'steal-emoji',
    description: "Steal an emoji from a different server.",
    usage: '$steal-emoji emoji',
    aliases: ['se'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_EMOJIS")) return;
        if (!args.length) return message.reply("Please specify some emojis!");
        
        for (const rawEmoji of args) {
            const parsedEmoji = Util.parseEmoji(rawEmoji);
        

            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + 
                    extension}`;
                message.guild.emojis.create(url.parsedEmoji.name)
                    .then((emoji) => message.channel.send(`Added: \`${emoji.url}\``))
            }
        }
    },
};