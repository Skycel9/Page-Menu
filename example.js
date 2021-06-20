const Discord = require("discord.js");
const {PageMenu} = require("./Util.js");

        const vEmbedPage1 = new Discord.MessageEmbed()
            .setAuthor("Skycel", "https://cdn.discordapp.com/avatars/457284070381191168/1ad08e9564fc679b45bbffd157eeb60d.png?size=1024")
            .setColor("#0067D8")
            .setDescription("I'm page 1")
            .setFooter("Made by Skycel");
        const vEmbedPage2 = new Discord.MessageEmbed()
            .setAuthor("Skycel", "https://cdn.discordapp.com/avatars/457284070381191168/1ad08e9564fc679b45bbffd157eeb60d.png?size=1024")
            .setColor("#0067D8")
            .setDescription("I'm page 2")
            .setFooter("Made by Skycel");
        const vEmbedPage3 = new Discord.MessageEmbed()
            .setAuthor("Skycel", "https://cdn.discordapp.com/avatars/457284070381191168/1ad08e9564fc679b45bbffd157eeb60d.png?size=1024")
            .setColor("#0067D8")
            .setDescription("I'm page 3")
            .setFooter("Made by Skycel");
            
        const vPages = [vEmbedPage1, vEmbedPage2, vEmbedPage3];

        const vButtonNext = new Buttons.MessageButton()
            .setStyle("blurple")
            .setEmoji("")
            .setLabel("▶")
            .setID("next");
        const vButtonPrevious = new Buttons.MessageButton()
            .setStyle("blurple")
            .setEmoji("")
            .setLabel("◀")
            .setID("previous");

        const vButtons = [vButtonPrevious, vButtonNext]

        PageMenu(message, vButtons, vPages)
