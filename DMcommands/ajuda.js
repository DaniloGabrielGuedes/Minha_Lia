const config = require('../global/config.json');

module.exports.run = async(client, message, args, aToken) => {
    const embed = {
        color: '0xffc9a0',
        title: `Bom dia! Lia v${config.version}`,
        description: "Comandos disponíveis em mensagens diretas até o momento:",
        fields: [
            {
                name: "**.ajuda**",
                value: "Mostra a lista de comandos disponíveis no momento"
            },
            {
                name: "**.m {Descrição da tarefa}**",
                value: "Marca um novo horário iniciando no momento do envio da mensagem com a descrição inserida"
            },
            {
                name: "**.limpar**",
                value: "Fará a limpeza de todos os registros feitos"
            }         
        ]
    }

    message.channel.send({ embeds: [embed] });
}