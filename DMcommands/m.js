const { MessageEmbed } = require('discord.js');
const config = require("../global/config.json");

var task = [];

module.exports.run = async(client, message, args) => {

    var date = new Date();
    date.setHours(date.getHours()) // TODO: - 3 on HEROKU 
    var dt = date.toTimeString().substring(0, 5);
    var description = "";
    
    try {
        task.push("**" + dt + "** - " + message.content.slice(config.prefix.length).replace("m ", ""));
        
        const embed = new MessageEmbed()
            .setColor(0xffc9a0)
            .setTitle("**Aqui está o seu resumo de horarios do dia.**")
            .setTimestamp()
            .setFooter({ text: "LAB1 Consultoria", iconURL: "https://cdn.discordapp.com/icons/684017942307930142/ba8f171a7a72b409f9a772ff046fa62d.webp" })
            
            for (let index = 0; index < task.length; index++) {
                description += task[index] + "\n";
            }        
            embed.setDescription(description)

        message.channel.send({ embeds: [embed] });

    } catch (err) {
        console.error("Erro: " + err);
        message.channel.send("**Vish ala deu pau** \n" + err);
    }
}
