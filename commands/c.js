const axios = require("axios");
const config = require("../global/config.json");



module.exports.run = async(client, message, args, aToken) => {
    var conf = {
        headers: {
            Authorization: aToken,
            orgId: '691060918'
        },
        params: {
            from: 1,
            limit: 100
        }
    };
    var found = false;

    while (!found) {
        await axios.get("https://desk.zoho.com/api/v1/tickets", conf).then(async response => {
            if (response.status == "200") {
                var sayMessage = "", newMessage = "";

                for (var i = 0; i < response.data.data.length; i++) {
                    var object = response.data.data[i];

                    if (object["ticketNumber"] == args[0]) {
                        found = true;
                        await getTicket(object["id"], message, aToken);
                        return;
                    }
                }

                if (!found) {
                    conf.params.from += 100;
                }
            } else if (response.status == "204") {
                found = true;
                message.channel.send("Chamado " + args[0] + " não encontrado :(");
                return;
            } else {
                found = true;
                message.channel.send("[1] Ocorreu um erro ao consumir API do Zoho - \n" + response.data);
                return;
            }
        }).catch(error => {
            found = true;
            console.log(error);
            message.channel.send("[1] Axios Error " + "\n" + error);
            return;
        });
    }
}

async function getTicket(id, message, aToken) {
    var conf = {
        headers: {
            Authorization: aToken,
            orgId: '691060918'
        }
    }

    await axios.get("https://desk.zoho.com/api/v1/tickets/" + id, conf).then(function (resp) {
        if (resp.status == "200") {
            var sayMessage = "";

            const embed = {
                "title": `#${resp.data["ticketNumber"]} ${resp.data["subject"]}`,
                "description": resp.data["webUrl"],
                "fields": [
                    {
                        name: "Status",
                        value: resp.data["status"],
                        inline: true
                    },
                    {
                        name: "Criado em",
                        value: resp.data["createdTime"].substring(0, 10),
                        inline: true
                    },
                    {
                        name: "Contato",
                        value: config.contacts[resp.data["contactId"] == null ? "indefinido" : resp.data["contactId"]],
                        inline: true
                    }
                ],
                "color": "0xffc9a0",
            }

            // sayMessage = `#${data.data["ticketNumber"]} ${data.data["subject"]} \n` +
            //              `${data.data["webUrl"]} \n` +
            //              `${config.accounts[data.data["accountId"]]} - ${data.data["status"]} \n` +
            //              `Criado em ${data.data["createdTime"].substring(0, 10)} por ${config.contacts[data.data["contactId"]]}`;
            // try {
                // message.channel.send({embed});
                message.channel.send({ embeds: [embed] });
            // } catch (error) {
                // message.channel.send('opa opa opa: ');
            // }
        } else {
            message.channel.send("[2] Ocorreu um erro ao consumir API do Zoho - \n" + response.data);
            return;
        }
    }).catch((error) => {
        message.channel.send("[2] Axios Error " + "\n" + error);
        return;
    })
}

