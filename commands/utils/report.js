const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name : 'report-bug',
    description: "Report a bug.",
    usage: '$report-bug argument',
    aliases: ['rb'],
    run : async(client, message, args) => {
        const owner = client.users.cache.get('535464240027402251');

        const query = args.join(" ");
        if (!query) return message.reply('Please specify a query');

        const reportEmbed = new MessageEmbed()
            .setTitle('New BUG!')
            .addField('Author', message.author.toString(), true)
            .addField('Guild', message.guild.name, true)
            .addField('Report', query)
            .setThumbnail(message.author.displayAvatarURL({ dynamic : true }))
            .setTimestamp();

        owner.send(reportEmbed);
    }
}