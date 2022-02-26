
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// const Discord = require('discord.js');
// const client = new Discord.Client();
const config = require("./global/config.json");
const token = 'ODQxMzExOTc1NzIzMzY4NTA5.YJk61Q.C-v5spyv5NlPgSqC-SAmNP5xQB4';
const axios = require("axios");
var aToken = "";

client.on("messageCreate", async (message) => {
    
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) 
    || (message.content.startsWith(`<@${client.user.id}>`))) return;

    const args = message.content.trim().slice(config.prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    
    axios.post("https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.955f7590aa45683ddccc764ce6379458.25d070229c93af92142187a1e8597184&client_id=1000.5PK6SJXSM6A2N06EI3YJ6MAPFRVFAL&client_secret=15e13a61f3b5b95411be6e4eb1a24d596a877f554c&scope=Desk.tickets.ALL&grant_type=refresh_token").then(async data => {
        try {

            if (data.status == "200")
                aToken = "Zoho-oauthtoken " + data.data["access_token"];
            else
                message.channel.send("Erro ao buscar access_token :c");

            var tempMsg = await message.reply("estou verificando!");
            const commandFile = require(`./commands/${command}.js`);
            await commandFile.run(client, message, args, aToken);
            tempMsg.delete();
        } catch (err) {
            console.error("Erro: " + err);
            message.channel.send("Erro: " + err);
        }
    })
})

client.login(token)

client.on('ready', () => {
    console.log('on');
    // client.channels.fetch("830215940435869706").then(channel => {
    //     channel.send("INICIADO ESSA MERDA");
    // })


    // client.channels.fetch("766022132559511585").then(channel => {
    //     if (!channel) return console.error("The channel does not exist!");
    //     channel.join().then(connection => {
    //         // Yay, it worked!
    //         console.log("Successfully connected.");
    //     }).catch(e => {

    //         // Oh no, it errored! Let's log it to console :)
    //         console.error(e);
    //     });
    // })
    

    setInterval(() => {

        const date = new Date(); // today
        // if ((date.getHours() === 11 && date.getMinutes() === 11) && date.getDay() != 0 && date.getDay() != 6) {

            // client.channels.fetch("841310589958881283").then(channel => {

            //     const ti = channel.guild.roles.cache.find(role => role.name == "TI");
            //     const messages = [
            //         "Reunião diária galerinha do " + `${ti}` + ".",
            //         "Camarão que dorme a onda leva então bora " + `${ti}` + ", reunião!",
            //         "Vamo acordar, vamo acordar, bora pra reunião.",
            //         "Olha o tempo cidadão, é hora da reunião.",
            //         "```if (DateTime.Now.Time == '09:25') \r\n   print(\"É hora da reunião!\") ```",
            //         "```SELECT CASE WHEN CONVERT(CHAR(5), GETDATE(), 108) = '09:25' THEN 'Reunião diária' ELSE 'Anda logo' END Mensagem```",
            //         "```<html>\r\n  <head> Reunião diária </head> \r\n  <body> Anda logo rapaiz </body> \r\n</html>```",
            //         ":robot: R E U N I Ã O - D I Á R I A :robot:",
            //         "https://TIdaLAB1.com/pt-br/hora?de=Reuniao%20Diaria",
            //         "Se arrume e ligue câmera, já é hora da Reunião.",
            //         "Já pegou seu café?",
            //         "De novo na mesma tarefa???",
            //         "01010010 01100101 01110101 01101110 01101001 11100011 01101111 00100000 01100100 01101001 11100001 01110010 01101001 01100001"                    
            //     ]
            //     const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            //     var msg = randomMessage.includes(`${ti}`) ? "**Bom dia!** \r\n" + randomMessage : "**Bom dia " + `${ti}` + "** \r\n" + randomMessage;

            //     msg += "\r\nReunião no link https://meet.google.com/eqo-vkby-qyb";

            //     channel.send(msg);
            // })
        // }
        
    //     if ((date.getHours() === 11 && date.getMinutes() === 30) && date.getDay() == 1) {
            // client.channels.fetch("841310589958881283").then(channel => {
            //     channel.send("**Bom dia @everyone!**");

            //     const embed = new MessageEmbed()
            //     .setColor(0xffc9a0)
            //     .setTitle("**Não se esqueçam de preencher a pesquisa de engajamento.**")
            //     .setDescription("**__[https://teamculture.com.br](https://app.teamculture.com.br/survey)__**")
            //     .setTimestamp()
            //     .setFooter({ text: "LAB1 Consultoria", iconURL: "https://cdn.discordapp.com/icons/684017942307930142/9fe6c340d4ca777e6792c7aee8fbc36e.webp?size=1024"})
            //     .setThumbnail("https://d2kq0urxkarztv.cloudfront.net/5d07af2a6d9d5501de3dac39/2530029/upload-ea23c1c9-a8e6-4251-a920-5a390f1e7f0a.png?e=webp&nll=true")
            //     channel.send({ embeds: [embed] });
            // })
    //     }

    //     if ((date.getHours() === 13 && date.getMinutes() === 33)) {
    //         client.channels.fetch("841310589958881283").then(channel => {
    //             channel.send("**Bom dia @everyone!**");

    //             const embed = new Discord.MessageEmbed()
    //             .setColor(0xffc9a0)
    //             .setTitle("**Não se esqueçam de enviar o email com seus apontamentos para o \\@TI <@841743135154765904>.**")
    //             .setDescription(" OPA <@841743135154765904> ")
    //             .setTimestamp()
    //             .setFooter("LAB1 Consultoria", "https://instagram.fsod2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/155536880_2558047587838075_1484160661346685355_n.jpg?_nc_ht=instagram.fsod2-1.fna.fbcdn.net&_nc_ohc=LmHZn5oQqPoAX-O_84Z&edm=ABfd0MgBAAAA&ccb=7-4&oh=472f5a2e4524902ad91c2d463e86be17&oe=60F87FBC&_nc_sid=7bff83")
    //             // .setThumbnail("https://instagram.fsod2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/155536880_2558047587838075_1484160661346685355_n.jpg?_nc_ht=instagram.fsod2-1.fna.fbcdn.net&_nc_ohc=LmHZn5oQqPoAX-O_84Z&edm=ABfd0MgBAAAA&ccb=7-4&oh=472f5a2e4524902ad91c2d463e86be17&oe=60F87FBC&_nc_sid=7bff83")
    //             // 841743135154765904
    //             channel.send(embed);
    //         })
    //     }

    //     // client.channels.fetch("830215940435869706").then(channel => {
    //     //     channel.send("**@everyone assim que faz um bot suas puta**");
    //     // })

    }, 6000); // check every minute
})
