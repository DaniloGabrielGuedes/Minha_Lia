const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async(client, message, args, aToken) => {
    
    var config = {
        headers: {
            Authorization: aToken,
            orgId: '691060918'
        },
        params: {
            from: 1,
            limit: 100
        }
    }

    axios.get("https://desk.zoho.com/api/v1/tickets", config).then(function(data){
        if (data.status == "200")
        {
            var sayMessage = "", newMessage = "";
            var count = 0;
            for (var i = 0; i < data.data.data.length; i++) {
                var object = data.data.data[i];
                newMessage = "#" + object["ticketNumber"] + " " + object["subject"] + "\n"
                
                if (sayMessage.length + newMessage.length > 2000) {
                    message.channel.send(sayMessage);
                    sayMessage = "";
                }

                sayMessage += newMessage;
                console.log(sayMessage);
                count++;
            }
            sayMessage += "Count: " + count;
    
            if (sayMessage.length > 0)
                message.channel.send(sayMessage);
        }
    })
}



function ticket(i) {
    console.log("#" + i["ticketNumber"] + " " + i["subject"]);
}

// module.exports.run = async(client, message, args) => {
//     const sayMessage = args.join(" ");
//     message.delete().catch(O_o => {});
//     message.channel.send(sayMessage);
// }