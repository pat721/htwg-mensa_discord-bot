const { Client, Intents } = require('discord.js');
const config = require("./config.json");
const cheerio = require('cheerio');
const axios = require('axios');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!';
const htwgMensaUrl = 'https://seezeit.com/essen/speiseplaene/mensa-htwg/';

// usable commands
// mensa (today/tomorrow) - lists all meals that are available today/tomorrow. day is optional.
// main (seezeit-teller) (sides) (today/tomorrow) - lists the main meal (Seezeit-Teller) from today or tomorrow. day and sides is optional.
// option (kombinierbar) (sides) (today/tomorrow) - lists the option meal (KombinierBar) from today or tomorrow. day and sides is optional.
// pasta (vegie) (today/tomorrow) - lists the pasta meal, vegetarian or meat, from today or tomorrow. day and vegetarian is optional.
// sides (today/tomorrow) - lists all the sides from today or tomorrow

commandArray = ['mensa', 'main', 'seezeit-teller', 'option', 'kombinierbar', 'pasta', 'vegie', 'sides', 'today', 'tomorrow'];

client.on("messageCreate", function(message) { 

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const commands = extractCommand(message);

    if(commandArray.includes(commands[0])) {
        if(commands[0] === 'mensa') {
            if(commands[1] === 'tomorrow') {
                // return meal list of tomorrow
            }
            // return meal list of today
        } else if(commands[0] === ('main' || 'seezeit-teller')) {
            if(commands[1] === 'sides') {
                if(commands[2] === 'tomorrow') {
                    // return main with sides of tomorrow
                }

            } else if(commands[1] === 'tomorrow') {
                // return main of tomorrow

            }
            // return main of today
        } // check option
        // check pasta
        // check sides
    }
});

function extractCommand(message) {
    const commandBody = message.content.slice(prefix.length).toLowerCase();
    const commands = commandBody.split(' ')
    return commands;
}

function httpWebsiteRequest() {
    axios.get(htwgMensaUrl).then( res => {
        const $ = cheerio.load(res.data);

        const meal = $('.contents_1').find('.speiseplanTagKat').filter(function() {
            return $(this).find('.category').text() === 'Seezeit-Teller'
        }).find('.title').text().replace(/\(.*\)/,'')

        message.reply(`:fork_and_knife: ${meal} :fork_and_knife:`)
    });
}


client.login(config.BOT_TOKEN);