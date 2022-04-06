const { Client, Intents } = require('discord.js');
const config = require('dotenv').config()
const { extractCommand, httpWebsiteRequest } = require("./helpers");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!';

// usable commands
// mensa [today/tomorrow] - lists all meals that are available today/tomorrow. day is optional.
// main [seezeit-teller] [sides] [today/tomorrow] - lists the main meal (Seezeit-Teller) from today or tomorrow.
// option [kombinierbar] [sides] [today/tomorrow] - lists the option meal (KombinierBar) from today or tomorrow.
// pasta [vegie] [today/tomorrow] - lists the pasta meal, vegetarian or meat, from today or tomorrow.
// sides [today/tomorrow] - lists all the sides from today or tomorrow.

var usableBotCommands = `
##############################
# USABLE HTWG-MENSA-BOT COMMANDS:
# !mensa [today/tomorrow] - lists all meals that are available today/tomorrow. day is optional.
# !main or !seezeit-teller [sides] [today/tomorrow] - lists the main meal (Seezeit-Teller) from today or tomorrow.
# !option or !kombinierbar [sides] [today/tomorrow] - lists the option meal (KombinierBar) from today or tomorrow.
# !pasta [vegie] [today/tomorrow] - lists the pasta meal, vegetarian or meat, from today or tomorrow.
# !sides [today/tomorrow] - lists all the sides from today or tomorrow.
##############################
`

const wholeCommandsArray = ['mensa', 'main', 'seezeit-teller', 'option', 'kombinierbar', 'pasta', 'vegie', 'sides', 'today', 'tomorrow', 'mensa-help'];

client.on("messageCreate", async function(message) { 

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const commands = extractCommand(message);

    if (wholeCommandsArray.includes(commands[0])) {
        var replyMessage = "";
        if(commands[0] === 'mensa-help') {
            replyMessage += usableBotCommands;
        } else if (commands[0] === 'mensa') {
            const mensaMealCategoryArray = ['main', 'option', 'pasta', 'vegie', 'sides'];
            for (const mealCategory of mensaMealCategoryArray) {
                const meal = await httpWebsiteRequest(mealCategory, commands[1])
                replyMessage += `${meal} \n\n`
            }
        } else if (commands[0] === 'main' || commands[0] === 'seezeit-teller') {
            if (commands[1] === 'sides') {
                const mainWithSidesArray = ['main', 'sides'];
                for (const mealCategory of mainWithSidesArray) {
                    const meal = await httpWebsiteRequest(mealCategory, commands[2])
                    replyMessage += `${meal} \n\n`
                }
            } else {
                const meal = await httpWebsiteRequest(commands[0], commands[1])
                replyMessage += `${meal} \n\n`
            }
        } else if (commands[0] === 'option' || commands[0] === 'kombinierbar') {
            if (commands[1] === 'sides') {
                const optionWithSidesArray = ['option', 'sides'];
                for (const mealCategory of optionWithSidesArray) {
                    const meal = await httpWebsiteRequest(mealCategory, commands[2])
                    replyMessage += `${meal} \n\n`
                }
            } else {
                const meal = await httpWebsiteRequest(commands[0], commands[1])
                replyMessage += `${meal} \n\n`
            }
        } else if (commands[0] === 'pasta') {
            if (commands[1] === 'vegie') {
                const meal = await httpWebsiteRequest(commands[1], commands[2])
                replyMessage += `${meal} \n\n`
            } else {
                const meal = await httpWebsiteRequest(commands[0], commands[1])
                replyMessage += `${meal} \n\n`
            }
        } else if (commands[0] === 'sides') {
            const meal = await httpWebsiteRequest(commands[0], commands[1])
            replyMessage += `${meal} \n\n`
        }
        message.reply(`${replyMessage}`)
    }
});

client.login(process.env.BOT_TOKEN);