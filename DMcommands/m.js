const { MessageEmbed } = require('discord.js');
const config = require("../global/config.json");

var tasks = [];

module.exports.run = async(client, message, args) => {

    var date = new Date();
    date.setHours(date.getHours()) // TODO: - 3 on HEROKU 
    var dt = date.toTimeString().substring(0, 5);
    var description;
    description = "";
    try {
        var task = "**" + dt + "** - " + message.content.slice(config.prefix.length).replace("m ", "");
        
        tasks.push([message.author.id, task]);
                
        const embed = new MessageEmbed()
            .setColor(0xffc9a0)
            .setTitle("**Aqui está o seu resumo de horarios do dia.**")
            .setTimestamp()
            .setFooter({ text: "LAB1 Consultoria", iconURL: "https://cdn.discordapp.com/icons/684017942307930142/ba8f171a7a72b409f9a772ff046fa62d.webp" })

            // for(var i = 0; i < tasks.length; i++){

            //     var obj = tasks[i];
            //     console.log(1);
                
            //     for(var key in obj){

            //         console.log(2);
            //         console.log(obj[key]);

            //         if(obj[key] == message.author.id){

            //             console.log(3);
            //             description += tasks[key][key.length];
            //             continue;
            //         }
            //     }
            // }


        // for (let index = 0; index < tasks.length; index++) {
            
        //     console.log(tasks[index]);

        //     if (tasks[index] == message.author.id)
        //     {
        //         for (let x = 0; index < tasks[i].length; x++) {
                    
        //             description += tasks[index][i] + "\n";
                    
        //         }
        //     }
        // }
        
        embed.setDescription(description)

        message.channel.send({ embeds: [embed] });

    } catch (err) {
        console.error("Erro: " + err);
        message.channel.send("**Vish ala deu pau** \n" + err);
    }
}
