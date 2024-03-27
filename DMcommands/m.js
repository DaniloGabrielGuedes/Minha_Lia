const { MessageEmbed } = require('discord.js');
const config = require("../global/config.json");

var tasks = [];
var atualizarDia;

module.exports = {
    tasks,
    run: async (client, message, args) => {
        var date = new Date();
        date.setHours(date.getHours())

        if (atualizarDia != date.getDay()) {
            tasks.length = 0;
            atualizarDia = date.getDay();
        }

        var time = date.toTimeString().substring(0, 5);
        var content = message.content.slice(config.prefix.length).replace("m ", "");
        var descriptionField = [];
        var totalMinutes = 0;
        var lastTaskTime = null;
        try {
            var msg = { message: null, initTime: null };
            var task = { userId: message.author.id, time: time, message: content };
            tasks.push(task);

            tasks.sort(function (a, b) {
                return a.time.localeCompare(b.time);
            });

            const embed = new MessageEmbed()
                .setColor(0xffc9a0)
                .setTitle("**Aqui está o seu resumo de horarios do dia.**")
                .setTimestamp()
                .setFooter({ text: "Sua empresa", iconURL: "imagem" })

            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                if (task.userId == message.author.id) {
                    if (lastTaskTime != null) {

                        var timeParts = lastTaskTime.split(":");
                        var lastTime = new Date();
                        lastTime.setHours(timeParts[0]);
                        lastTime.setMinutes(timeParts[1]);

                        timeParts = task.time.split(":");
                        var time = new Date();
                        time.setHours(timeParts[0]);
                        time.setMinutes(timeParts[1]);

                        var difference = (time - lastTime) / 1000 / 60;
                        totalMinutes += difference;
                    }

                    msg = { message: task.message, initTime: task.time };

                    descriptionField.push(msg);

                    lastTaskTime = task.time;
                }
            }

            var hours = Math.floor(totalMinutes / 60);
            var minutes = totalMinutes % 60;

            for (var i = 0; i < descriptionField.length; i++) {
                msg = descriptionField[i];
                var horaFinal = "";

                if (descriptionField.length > 1 && descriptionField.length > i + 1) {
                    
                    let init = msg.initTime.split(':');
                    let last = descriptionField[i + 1].initTime.split(':');

                    let iniTime = new Date();
                    iniTime.setHours(init[0]);
                    iniTime.setMinutes(init[1]);
                    
                    let lasTime = new Date();
                    lasTime.setHours(last[0]);
                    lasTime.setMinutes(last[1]);
                    
                    let minutes = (lasTime - iniTime) / 1000 / 60; 
                    
                    horaFinal = " || " + descriptionField[i + 1].initTime + " = **" + Math.floor(minutes / 60) + "h " + (minutes % 60) + "min**";
                }

                embed.addField(msg.message, msg.initTime + horaFinal);
            }

            embed.setDescription("**Total de horas: " + hours + "h " + minutes + "min**");

            message.channel.send({ embeds: [embed] });

        } catch (err) {
            console.error("Erro: " + err);
            message.channel.send("**Vish ala deu pau** \n" + err);
        }
    }
}