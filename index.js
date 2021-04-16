const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants')
const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const { MessageAttachment } = require("discord.js")
const Schema = require("./models/welcomeChannel");
const Canvas = require("discord-canvas");
const ReactionSchema = require("./models/reaction-roles")
const path = require("path")
const { getCommands } = require('./utils')
const client = new Client({
    disableEveryone: true,
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
})
const mongoose = require("mongoose")
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    const clientDetails = {
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
        channels: client.channels.cache.size
    }

    // express

    const express = require("express");

    const app = express();

    const port = process.env.PORT || 3001;

    app.set('view engine', 'ejs');

    app.get("/", (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "pages", "landingPage.html"))
    });

    app.get("/commands", (req, res) => {
        const commands = getCommands();
        res.status(200).render('commands', { commands })
    })

    app.get("/info", (req, res) => {
        res.status(200).send(clientDetails)
    })

    app.listen(port)


    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)
    /* status change */
    const arrayOfStatus = [
        `${client.guilds.cache.size} servers`,
        `${client.channels.cache.size} channels`,
        `${client.users.cache.size} users`,
        `${client.user.tag} discord bot!`,
        `run $help`,
    ];

    let index = 0;
    setInterval(() => {
        if (index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        client.user.setActivity(status);
        index++;
    }, 5000);

});

client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    ReactionSchema.findOne({ Message: reaction.message.id}, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.add(roleid);
    });
});

client.on('messageReactionRemove', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    ReactionSchema.findOne({ Message: reaction.message.id}, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.remove(roleid);
    });
});

client.on('guildMemberAdd', async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
        const user = member.user;
        const image = new Canvas.Welcome()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setMemberCount(member.guild.memberCount)
            .setGuildName(member.guild.name)
            .setAvatar(user.displayAvatarURL({format : "png"}))
            .setColor("border", "#8015EA")
            .setColor("username-box", "#8015EA")
            .setColor("discriminator-box", "#8015EA")
            .setColor("message-box", "#8015EA")
            .setColor("title", "#8015EA")
            .setColor("avatar", "#8015EA")
            .setBackground(
                "https://i.imgur.com/4yAzOai.png"
                )
            .toAttachment();

        const attachment = new MessageAttachment(
            (await image).toBuffer(), 
            "goodbye-image.png"
        );

        const channel = member.guild.channels.cache.get(data.Channel);
        channel.send(attachment)
    });
});

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
    if (!message.guild || message.author.id === client.user.id) return;

    const splittedMsgs = message.content.split(" ");

})
client.login(token)

mongoose.connect("mongodb+srv://root:o7c4DWZ9yTNnGAOv@cluster0.ejdy1.mongodb.net/test", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
console.log("MongoDb Ok!");