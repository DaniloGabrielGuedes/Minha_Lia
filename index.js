const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ partials: ["CHANNEL"], intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES, 
    Intents.FLAGS.DIRECT_MESSAGE_TYPING    
] });
const fs = require('fs');
const token = fs.readFileSync('./token', 'utf8');
const config = require("./global/config.json");
const axios = require("axios");
var aToken = "";

client.login(token)

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content == config.prefix) return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) 
    || (message.content.startsWith(`<@${client.user.id}>`))) return;

    const args = message.content.trim().slice(config.prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    
    if (message.channel.type == "DM") {
        try {

            const commandFile = require(`./DMcommands/${command}.js`);
            await commandFile.run(client, message, args);

        } catch (err) {
            console.error("Erro: " + err);
            if (err.toString().includes("Cannot find module"))
                message.channel.send("Este comando ainda não existe. Consulte ***.ajuda*** para listar os comandos disponíveis :)");
            else
                message.channel.send("**Vish ala deu pau** \n" + err);
        }
    }
    else {
        try {
            axios.post(fs.readFileSync('./ZohoDesk', 'utf8')).then(async data => {

                if (data.status == "200")
                    aToken = "Zoho-oauthtoken " + data.data["access_token"];
                else
                    message.channel.send("Erro ao buscar access_token :c");

                var tempMsg = await message.reply("estou verificando!");
                const commandFile = require(`./commands/${command}.js`);
                await commandFile.run(client, message, args, aToken);
                tempMsg.delete();
            })
        } catch (err) {
            console.error("Erro: " + err);
            if (err.toString().includes("Cannot find module"))
                message.channel.send("Este comando ainda não existe. Consulte ***.ajuda*** para listar os comandos disponíveis :)");
            else
                message.channel.send("**Vish ala deu pau** \n" + err);
            tempMsg.delete();
        }
    }
})

client.on('ready', () => {
    var dt = new Date();
    dt.setHours(dt.getHours());
    console.log('on');
    console.log(dt.toString());

    // client.channels.fetch("841310589958881283").then(channel => {
    //     channel.send('oieee');
    // });

    setInterval(() => {

        const date = new Date();
        date.setHours(date.getHours()); // fuso horario do Brasil

        // if ((date.getHours() === 08 && date.getMinutes() === 35) && date.getDay() != 0 && date.getDay() != 6) { // Diferente de domingo e sabado

        //     client.channels.fetch("753276752192602264").then(channel => { // CANAL SPRINT LAB1 SERVER

        //         const ti = channel.guild.roles.cache.find(role => role.name == "Time");
        //         const messages = [
        //             "Reunião diária galerinha do " + `${ti}` + ".",
        //             "Camarão que dorme a onda leva então bora " + `${ti}` + ", reunião!",
        //             "Vamo acordar, vamo acordar, bora pra reunião.",
        //             "Olha o tempo cidadão, já é hora da reunião.",
        //             "```if (DateTime.Now.Time == '08:35') \r\n   print(\"É hora da reunião!\") \r\n```",
        //             "```SELECT CASE WHEN CONVERT(CHAR(5), GETDATE(), 108) = '08:35' THEN 'Reunião diária' ELSE 'Anda logo' END Mensagem\r\n```",
        //             "```<html>\r\n  <head> Reunião diária </head> \r\n  <body> Anda logo rapaiz </body> \r\n</html>\r\n```",
        //             ":robot: R E U N I Ã O - D I Á R I A :robot:",
        //             "https://TimeLAB1.com/pt-br/hora?de=Reuniao%20Diaria",
        //             "Se arrume e ligue câmera, já é hora da reunião.",
        //             "Já pegou seu café?",
        //             "De novo na mesma tarefa???",
        //             "01010010 01100101 01110101 01101110 01101001 11100011 01101111 00100000 01100100 01101001 11100001 01110010 01101001 01100001",
        //             "```string linkReuniao = DateTime.Now.Time == '08:35' ? \"https://meet.google.com/pet-tebn-pwv\" : null; \r\n" + 
        //                 "if (!string.isNullOrEmpty(linkReuniao))\r\n   Console.WriteLine($\"Reunião no link {linkReuniao}\") \r\n```"
        //         ]
        //         const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        //         var msg = randomMessage.includes(`${ti}`) ? "**Bom dia!** \r\n" + randomMessage : "**Bom dia " + `${ti}` + "** \r\n" + randomMessage;

        //         msg += "\r\nReunião no link https://meet.google.com/pet-tebn-pwv";

        //         channel.send(msg);
        //     })
        // }

        // if ((date.getHours() === 11 && date.getMinutes() === 30) && date.getDay() == 1) {
        //     client.channels.fetch("684017942307930147").then(channel => { // CANAL GERAL LAB1 SERVER
        //         channel.send("**Bom dia @everyone!**");

        //         const embed = new MessageEmbed()
        //         .setColor(0xffc9a0)
        //         .setTitle("**Não se esqueçam de preencher a pesquisa semanal de engajamento.**")
        //         .setDescription("**__[https://teamculture.com.br](https://app.teamculture.com.br/survey)__**")
        //         .setTimestamp()
        //         .setFooter({ text: "LAB1 Consultoria", iconURL: "https://cdn.discordapp.com/icons/684017942307930142/ba8f171a7a72b409f9a772ff046fa62d.webp"})
        //         .setThumbnail("https://d2kq0urxkarztv.cloudfront.net/5d07af2a6d9d5501de3dac39/2530029/upload-ea23c1c9-a8e6-4251-a920-5a390f1e7f0a.png?e=webp&nll=true")
        //         channel.send({ embeds: [embed] });
        //     })
        // }

        // if ((date.getHours() === 08 && date.getMinutes() === 10) && date.getDay() != 0 && date.getDay() != 6) {
        //     client.channels.fetch("753276752192602264").then(channel => {
                
        //         const ti = channel.guild.roles.cache.find(role => role.name == "Time");

        //         channel.send("**Bom dia " + `${ti}` + "!**");
                
        //         let lastWorkingDay = new Date(dt);
        //         lastWorkingDay.setDate(-1);
        //         while (lastWorkingDay.getDay() % 6 === 0) {
        //             lastWorkingDay.setDate(lastWorkingDay.getDate() - 1);
        //         }    
        //         const diasDaSemana = ["", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", ""];
                
        //         let diaExtenso = diasDaSemana[lastWorkingDay.getDay()];

        //         const embed = new MessageEmbed()
        //             .setColor("#2e8b57")
        //             .setTitle(`**Lembrou de apontar suas tarefas e seus horários de ${diaExtenso} no Zoho Sprint?**`)
        //             .setDescription("\r\n**__[https://sprints.zoho.com](https://sprints.zoho.com/team/lab1#globalview)__**")
        //             .setTimestamp()
        //             .setFooter({ text: "LAB1 Consultoria", iconURL: "https://cdn.discordapp.com/icons/684017942307930142/ba8f171a7a72b409f9a772ff046fa62d.webp" })
        //             .setThumbnail("https://play-lh.googleusercontent.com/Rs3SFvqpYwbVMVJHE4TNquBGSXzVWxlRqwPUZJrqLDh8czqjapZra_9m8AXsQavcah3I=w70-h70")
        //         channel.send({ embeds: [embed] });
        //     })
        // }

        // if ((date.getHours() === 11 && date.getMinutes() === 30) && date.getDay() == 2) {
        //     client.channels.fetch("684017942307930147").then(channel => { // CANAL GERAL LAB1 SERVER 
                
        //         const ti = channel.guild.roles.cache.find(role => role.name == "Time");

        //         channel.send("**Bom dia " + `${ti}` + "!**");

        //         const embed = new MessageEmbed()
        //             .setColor("#2e8b57")
        //             .setTitle("**Já enviou um feedback hoje?** \r\n Aproveite essa chance para ajudar um colega a evoluir profissionalmente!**")
        //             .setDescription("\r\n**__[Impulseup.com](https://lab1-consultoria.impulseup.com/dashboard/participant/feedback)__**")
        //             .setTimestamp()
        //             .setFooter({ text: "LAB1 Consultoria", iconURL: "https://cdn.discordapp.com/icons/684017942307930142/ba8f171a7a72b409f9a772ff046fa62d.webp" })
        //             .setThumbnail("https://yt3.ggpht.com/ytc/AMLnZu8qOb9ezmIkdjPKPp892g4b7lyMC0RIzEiCCq8ZCw=s900-c-k-c0x00ffffff-no-rj")
        //         channel.send({ embeds: [embed] });
        //     })
        // }
    }, 6000); // check every minute
})
