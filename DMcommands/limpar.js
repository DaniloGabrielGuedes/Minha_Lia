const { MessageEmbed } = require('discord.js');
const config = require("../global/config.json");
const { tasks } = require("./m.js");

module.exports.run = async(client, message, args) => {

    tasks.length = 0;
    message.channel.send("Registro de horários limpo.");

}
