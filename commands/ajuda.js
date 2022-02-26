const config = require('../global/config.json');

module.exports.run = async(client, message, args, aToken) => {
    const embed = {
        title: `Bom dia! Lia v${config.version}`,
        description: "Comandos disponíveis até o momento:",
        fields: [
            {
                name: "**.ajuda**",
                value: "Mostra a lista de comandos disponíveis no momento"
            },
            {
                name: "**.c {Nº Chamado}**",
                value: "Detalha as informações do chamado desejado. Exemplo: **'.c 1000'**"
            },
            {
                name: "**.o {Empresa} {Prioridade}**",
                value: "Lista os chamados abertos de uma empresa específica (ou '.' para trazer todas), ordenando por prioridade. Exemplo: **'.o nutrisafra alto'**"
            }         
        ]
    }

    message.channel.send({ embeds: [embed] });
}