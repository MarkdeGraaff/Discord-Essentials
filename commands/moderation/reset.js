const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reset",
  description: "Reset someone's nickname.",
  usage: '$reset @user',
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    const member = message.mentions.members.first();

    if (!member) return message.reply("Please specify a member!");

    try {
      member.setNickname(null);
    } catch (err) {
      message.reply(
        "I do not have permission to reset " + member.toString() + " nickname!"
      );
    }
  },
};