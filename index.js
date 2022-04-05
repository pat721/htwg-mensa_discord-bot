const { Client, Intents } = require('discord.js');
const config = require("./config.json");
const { extractCommand, httpWebsiteRequest } = require("./helpers");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!';

// usable commands
// mensa (today/tomorrow) - lists all meals that are available today/tomorrow. day is optional.
// main (seezeit-teller) (sides) (today/tomorrow) - lists the main meal (Seezeit-Teller) from today or tomorrow. day and sides is optional.
// option (kombinierbar) (sides) (today/tomorrow) - lists the option meal (KombinierBar) from today or tomorrow. day and sides is optional.
// pasta (vegie) (today/tomorrow) - lists the pasta meal, vegetarian or meat, from today or tomorrow. day and vegetarian is optional.
// sides (today/tomorrow) - lists all the sides from today or tomorrow

const wholeCommandsArray = ['mensa', 'main', 'seezeit-teller', 'option', 'kombinierbar', 'pasta', 'vegie', 'sides', 'today', 'tomorrow'];

client.on("messageCreate", async function(message) { 

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const commands = extractCommand(message);

    if (wholeCommandsArray.includes(commands[0])) {
        var mealMessage = "";
        if (commands[0] === 'mensa') {
            const mensaMealCategoryArray = ['main', 'option', 'pasta', 'vegie', 'sides'];
            for (const mealCategory of mensaMealCategoryArray) {
                const meal = await httpWebsiteRequest(mealCategory, commands[1])
                mealMessage += `${meal} \n\n`
            }
        } else if (commands[0] === 'main' || commands[0] === 'seezeit-teller') {
            if (commands[1] === 'sides') {
                const mainWithSidesArray = ['main', 'sides'];
                for (const mealCategory of mainWithSidesArray) {
                    const meal = await httpWebsiteRequest(mealCategory, commands[2])
                    mealMessage += `${meal} \n\n`
                }
            } else {
                const meal = await httpWebsiteRequest(commands[0], commands[1])
                mealMessage += `${meal} \n\n`
            }
        } else if (commands[0] === 'option' || commands[0] === 'kombinierbar') {
            if (commands[1] === 'sides') {
                const optionWithSidesArray = ['option', 'sides'];
                for (const mealCategory of optionWithSidesArray) {
                    const meal = await httpWebsiteRequest(mealCategory, commands[2])
                    mealMessage += `${meal} \n\n`
                }
            } else {
                const meal = await httpWebsiteRequest(commands[0], commands[1])
                mealMessage += `${meal} \n\n`
            }
        } else if (commands[0] === 'pasta') {
            if (commands[1] === 'vegie') {
                const pastaArray = ['pasta', 'vegie'];
                for (const mealCategory of pastaArray) {
                    const meal = await httpWebsiteRequest(mealCategory, commands[2])
                    mealMessage += `${meal} \n\n`
                }
            } else {
                const meal = await httpWebsiteRequest(commands[0], commands[1])
                mealMessage += `${meal} \n\n`
            }
        } else if (commands[0] === 'sides') {
            const meal = await httpWebsiteRequest(commands[0], commands[1])
            mealMessage += `${meal} \n\n`
        }
        message.reply(`${mealMessage}`)
    }
});

client.login(config.BOT_TOKEN);