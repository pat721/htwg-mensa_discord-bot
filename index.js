const { Client, Intents } = require('discord.js');
const config = require("./config.json");
const cheerio = require('cheerio');
const axios = require('axios');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!';
const htwgMensaUrl = 'https://seezeit.com/essen/speiseplaene/mensa-htwg/';



client.on("messageCreate", function(message) { 

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const command = extractCommand(message);

    console.log(command);

    axios.get(htwgMensaUrl).then( res => {
        const $ = cheerio.load(res.data);
        
        $('.contents_1').each((index, element) => {
            const type = $(element).find('.category').text()
            const mealTitle = $(element).find('.title').text()
            message.reply('Heute gibts: ' + mealTitle)
        })
    })

                        
});

function extractCommand(message) {
    const commandBody = message.content.slice(prefix.length);
    const command = commandBody.toLowerCase();
    return command;
}


client.login(config.BOT_TOKEN);