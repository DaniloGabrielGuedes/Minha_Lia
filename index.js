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

        // if ((date.getHours() === 8 && date.getMinutes() === 35) && date.getDay() != 0 && date.getDay() != 6) { // Diferente de domingo e sabado

        // }
        
    }, 6000); // check every minute
})
