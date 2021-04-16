const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'purge-user',
    description: "Purge a specific user's messages.",
    usage: '$purge-user @user',
    aliases : ['pu', 'up'],
    run : async (client, message, args) => {
        const member = message.mentions.members.first();
        const messages = message.channel.messages.fetch();

        if(member) {
            const userMessages = (await messages).filter(
                (m) => m.author.id === member.id
            );
            await message.channel.bulkDelete(userMessages);
            message.channel.send(`${member} messages has been cleared.`);
        } else {
            if (!args[0])
                return message.channel.send(
                    "Please specify a number of messages to delete randing from 1-99"
                ); 
            if (isNaN(args[0]))
                return message.channel.send("Only numbers are allowed!");
            if (parseInt(args[0]) > 99)
             return message.channel.send(
                 "I can only delete a max amount of 99 messages at a time. This is to set to 99 to prevent lag."
             );
            await message.channel
                .bulkDelete(parseInt(args[0]) + 1)
                .catch((err) => console.log(err));
            message.channel.send("Deleted " + args[0] + " messages.");
        }
    },
};