var CoreBot = require(__dirname + '/CoreBot.js');
var Slackbot = require(__dirname + '/SlackBot.js');
var BotFrameworkBot = require(__dirname + '/BotFramework.js');

module.exports = {
    core: CoreBot,
    slackbot: Slackbot,
    botframeworkbot: BotFrameworkBot,
};
