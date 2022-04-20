const cheerio = require('cheerio');
const axios = require('axios');

const htwgMensaUrl = 'https://seezeit.com/essen/speiseplaene/mensa-htwg/';

function extractCommand(message) {
    const commandBody = message.content.slice(1).toLowerCase();
    const commands = commandBody.split(' ');
    return commands;
}

function convertCommandToHTMLCategory(command) {
    switch (command) {
        case 'seezeit-teller': //fall-through to main
        case 'main': return 'Seezeit-Teller';
        case 'kombinierbar': //fall-through to option
        case 'option': return 'KombinierBar';
        case 'pasta': return 'Pastastand';
        case 'vegie': return 'Pastastand vegetarisch';
        case 'sides': return 'Beilagen';
    }
}

async function httpWebsiteRequest(mealCategory, day) {

    var mealMessage = "";
    var internalMealCategory = convertCommandToHTMLCategory(mealCategory);

    if(day === 'tomorrow') {
        await axios.get(htwgMensaUrl).then( res => {
            const $ = cheerio.load(res.data);
            mealMessage = $('.contents_aktiv').next().find('.speiseplanTagKat').filter(function() {
                return $(this).find('.category').text() === internalMealCategory
            }).find('.title').text().replaceAll(/\([\d*\w{1},]*\)|\([\d,]*\)/g,'');
        });
    } else {
        await axios.get(htwgMensaUrl).then( res => {
            const $ = cheerio.load(res.data);
            mealMessage = $('.contents_aktiv').find('.speiseplanTagKat').filter(function() {
                return $(this).find('.category').text() === internalMealCategory
            }).find('.title').text().replaceAll(/\([\d*\w{1},]*\)|\([\d,]*\)/g,'');
        });
    }

    return `**${internalMealCategory}**: ${mealMessage}`;
}

function generateDateMessage(commands) {
    const today = new Date();

    const tomorrow = new Date;
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (commands.includes("tomorrow")) {

        return `***Morgen, am ${tomorrow.toLocaleDateString("de")}, gibt's***: \n`
    }
    return `***Heute, am ${today.toLocaleDateString("de")}, gibt's***: \n`
}

exports.httpWebsiteRequest = httpWebsiteRequest;
exports.extractCommand = extractCommand;
exports.generateDateMessage = generateDateMessage;
exports.convertCommandToHTMLCategory = convertCommandToHTMLCategory;
