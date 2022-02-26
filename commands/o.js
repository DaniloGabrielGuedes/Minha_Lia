const axios = require("axios");
const config = require("../global/config.json");

module.exports.run = async(client, message, args, aToken) => {
    let account = "";
    let priority = "";
    let saymessage = "";

    if (args.length > 0) {
        if (args[0] != ".") {
            account = config.accounts[args[0].toLowerCase()]

            if (!account) {
                sayMessage = `Empresa ${args[0]} não encontrada :(`;
                message.channel.send(sayMessage);
                return;
            }
        }

        if (args.length > 1) {
            if (args[1] != ".") {
                switch (args[1].toLowerCase()) {
                    case "alto": case "alta": case "high":
                        priority = "High"
                        break;

                    case "medio": case "media": case "medium":
                        priority = "Medium"
                        break;

                    case "baixo": case "baixa": case "low":
                        priority = "Low"
                        break;
                }
                if (!priority) {
                    sayMessage = `Prioridade ${args[1]} não encontrada :(`;
                    message.channel.send(sayMessage);
                    return;
                }
            }
        }
    }

    await GetTickets(account, priority, message, aToken).then(tickets => {
        let embed = {
            "title": `${config.accounts[account]} - Prioridade Alta`,
            "description": ""
        }
        let msg;
        let countHigh = countMedium = countLow = countNone = countTotal = 0;

        tickets.high.forEach(t => {
            msg = `\n**[#${t["ticketNumber"]} ${t["subject"]}](${t["webUrl"]})**\n`
            msg += `Status ${t["status"]} - Criado em ${t["createdTime"].substring(0, 10)}\n`

            if ((embed.description + msg).length > 1900) {
                message.channel.send({ embeds: [embed] });
                embed.description = "";
            }

            embed.description += msg;
            countHigh++;
        })
        if (embed.description.length > 0) {
            message.channel.send({ embeds: [embed] });
            message.channel.send("Total de chamados com prioridade alta: " + countHigh);
        }

        embed = {
            "title": `${config.accounts[account]} - Prioridade Média`,
            "description": ""
        }
        tickets.medium.forEach(t => {
            msg = `\n**[#${t["ticketNumber"]} ${t["subject"]}](${t["webUrl"]})**\n`
            msg += `Status ${t["status"]} - Criado em ${t["createdTime"].substring(0, 10)}\n`

            if ((embed.description + msg).length > 1900) {
                message.channel.send({ embeds: [embed] });
                embed.description = "";
            }

            embed.description += msg;
            countMedium++;
        })
        if (embed.description.length > 0) {
            message.channel.send({ embeds: [embed] });
            message.channel.send("Total de chamados com prioridade média: " + countMedium);
        }

        embed = {
            "title": `${config.accounts[account]} - Prioridade Baixa`,
            "description": ""
        }
        tickets.low.forEach(t => {
            msg = `\n**[#${t["ticketNumber"]} ${t["subject"]}](${t["webUrl"]})**\n`
            msg += `Status ${t["status"]} - Criado em ${t["createdTime"].substring(0, 10)}\n`

            if ((embed.description + msg).length > 1900) {
                message.channel.send({ embeds: [embed] });
                embed.description = "";
            }

            embed.description += msg;
            countLow++;
        })
        if (embed.description.length > 0) {
            message.channel.send({ embeds: [embed] });
            message.channel.send("Total de chamados com prioridade baixa: " + countLow);
        }

        embed = {
            "title": `${config.accounts[account]} - Sem Prioridade`,
            "description": ""
        }
        tickets.none.forEach(t => {
            msg = `\n**[#${t["ticketNumber"]} ${t["subject"]}](${t["webUrl"]})**\n`
            msg += `Status ${t["status"]} - Criado em ${t["createdTime"].substring(0, 10)}\n`

            if ((embed.description + msg).length > 1900) {
                message.channel.send({ embeds: [embed] });
                embed.description = "";
            }

            embed.description += msg;
            countNone++;
        })
        if (embed.description.length > 0) {
            message.channel.send({ embeds: [embed] });
            message.channel.send("Total de chamados sem prioridade: " + countNone);
        }

        countTotal = countHigh + countMedium + countLow + countNone;
        if (countTotal)
            message.channel.send("Total de chamados abertos: " + countTotal);

    }).catch(err => {
        message.channel.send("Deu pau de no vo: " + err);
    })

    // if (!priority || priority == "High") highTickets = await GetTickets(account, priority, message);
    // if (!priority || priority == "Medium") mediumTickets = await GetTickets(account, priority);
    // if (!priority || priority == "Low") lowTickets = await GetTickets(account, priority);


    // message.channel.send(highTickets + "-aqui");
    // message.channel.send("High: \n");
    // highTickets.forEach(t => {
    //     const embed = {
    //         "title": `#${t["ticketNumber"]} ${t["subject"]}`,
    //         "url": t["webUrl"],
    //         "fields": [
    //             {
    //                 name: "Status",
    //                 value: t["status"],
    //                 inline: true
    //             },
    //             {
    //                 name: "Criado em",
    //                 value: t["createdTime"].substring(0, 10),
    //                 inline: true
    //             },
    //             {
    //                 name: "Contato",
    //                 value: config.contacts[t["contactId"]],
    //                 inline: true
    //             }
    //         ]
    //     }
    //     message.channel.send({embed});
    // })

    // message.channel.send("Medium: \n");
    // mediumTickets.forEach(t => {
    //     const embed = {
    //         "title": `#${t["ticketNumber"]} ${t["subject"]}`,
    //         "url": t["webUrl"],
    //         "fields": [
    //             {
    //                 name: "Status",
    //                 value: t["status"],
    //                 inline: true
    //             },
    //             {
    //                 name: "Criado em",
    //                 value: t["createdTime"].substring(0, 10),
    //                 inline: true
    //             },
    //             {
    //                 name: "Contato",
    //                 value: config.contacts[t["contactId"]],
    //                 inline: true
    //             }
    //         ]
    //     }
    //     message.channel.send({embed});
    // })

    // message.channel.send("Low: \n");
    // lowTickets.forEach(t => {
    //     const embed = {
    //         "title": `#${t["ticketNumber"]} ${t["subject"]}`,
    //         "url": t["webUrl"],
    //         "fields": [
    //             {
    //                 name: "Status",
    //                 value: t["status"],
    //                 inline: true
    //             },
    //             {
    //                 name: "Criado em",
    //                 value: t["createdTime"].substring(0, 10),
    //                 inline: true
    //             },
    //             {
    //                 name: "Contato",
    //                 value: config.contacts[t["contactId"]],
    //                 inline: true
    //             }
    //         ]
    //     }
    //     message.channel.send({embed});
    // })
}

async function GetTickets(account, priority, message, aToken) {
    var tickets = {
        high: [], 
        medium: [], 
        low: [],
        none: []
    };

    var cfg = {
        headers: {
            Authorization: aToken,
            orgId: '691060918'
        },
        params: {
            from: 1,
            limit: 100,
            status: "open,on hold,escalated"
        }
    };

    if (priority) {
        cfg.params = {
            from: cfg.params.from,
            limit: cfg.params.limit,
            status: cfg.params.status,
            priority: priority.toLowerCase()
        }
    }
    
    try {
        let end = false;
        while (!end) {
            const response = await axios.get("https://desk.zoho.com/api/v1/tickets", cfg);
            if (response.status == "200") {
                for (let i = 0; i < response.data.data.length; i++) {

                    const object = response.data.data[i];
                    if (object["priority"] == priority || !priority) {

                        const resp = await axios.get("https://desk.zoho.com/api/v1/tickets/" + object["id"], { headers: cfg.headers })
                        if (resp.status == "200") {

                            if (resp.data["accountId"] == account || !account) {
                                switch (resp.data.priority) {
                                    case "High":
                                        tickets.high[tickets.high.length] = resp.data;
                                        break;
                                    case "Medium":
                                        tickets.medium[tickets.medium.length] = resp.data;
                                        break;
                                    case "Low":
                                        tickets.low[tickets.low.length] = resp.data;
                                        break;
                                    default:
                                        tickets.none[tickets.none.length] = resp.data;
                                        break;
                                }
                            }
                        } else {
                            end = true;
                            message.channel.send("[1] Deu pau - \n" + resp.data);
                            return undefined;
                        }
                    }
                }

                if (!end) {
                    cfg.params.from += 100;
                }
            } else if (response.status == "204") {
                end = true;
            } else {
                end = true;
                message.channel.send("[1] Ocorreu um erro ao consumir API do Zoho - \n" + response.data);
                return undefined;
            }
        }

        return tickets;
    } catch (error) {
        message.channel.send("erro: " + error);
        return undefined;
    }

        // axios.get("https://desk.zoho.com/api/v1/tickets", cfg).then(response => {
        //     console.log("salve");
        //     if (response.status == "200") {
        //         for (let i = 0; i < response.data.data.length; i++) {
        //             let object = response.data.data[i];

        //             if (object["priority"] == priority || !priority) {
        //                 axios.get("https://desk.zoho.com/api/v1/tickets/" + object["id"], {headers: cfg.headers}).then(resp => {
        //                     console.log("ta salvo");
        //                     if (resp.data["accountId"] == account || !account) {
        //                         tickets[count] = resp.data;
        //                         var v = tickets[count];
        //                         count++;                                
        //                         message.channel.send(v.accountId + "-drento");
        //                     }
        //                 }).catch(error => {
        //                     end = true;
        //                     console.log(error);
        //                     message.channel.send("[2] Axios Error " + "\n" + error);
        //                     return undefined;
        //                 });
        //             }
        //         }

        //         if (!end) {
        //             cfg.params.from += 100;
        //         }
                
        //         return tickets;
        //     } else if (response.status == "204") {
        //         end = true;
        //         return tickets;
        //     } else {
        //         end = true;
        //         message.channel.send("[1] Ocorreu um erro ao consumir API do Zoho - \n" + response.data);
        //         return undefined;
        //     }
        // }).catch(error => {
        //     end = true;
        //     console.log(error);
        //     message.channel.send("[1] Axios Error " + "\n" + error);
        //     return undefined;
        // });
        // console.log(count);
    // }
}