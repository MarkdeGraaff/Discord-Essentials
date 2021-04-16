const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'random-avatar',
    description: "Get a random user's avatar.",
    usage : '$random-avatar',
    aliases : ['r-avatar', 'avatar-rand'],
    run : async(client, message) => {
        const user = client.users.cache.random();

        message.channel.send(
            new MessageEmbed()
                .setColor("RANDOM")
                .setFooter(`${user.tag}'s avatar`)
                .setImage(user.displayAvatarURL())
        )
    }
}