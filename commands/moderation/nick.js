const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nick",
  description: "Give someone a nickname.",
  usage: '$nick @user',
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    const member = message.mentions.members.first();

    if (!member) return message.reply("Please specify a member!");

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("Please specify a nickname!");

    try {
      member.setNickname(arguments);
    } catch (err) {
      console.log(err);
      message.reply(
        "I do not have permission to set " + member.toString() + " nickname!"
      );
    }
  },
};