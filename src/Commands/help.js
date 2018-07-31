/**
 *  The 'help' command will return information about the bot.
 */
const help = () => (ctx) => {
    /* Send a help message back to the user */
    return ctx.replyWithMarkdown('I am the Photo Sempai Bot.\n\n' +
        'You can control me by sending me the following commands:\n\n' +
        '*General*\n' +
        '/start - start me up\n' +
        '/settings - these are the settings that are currently in place for me\n' +
        '/help - look at all of this help I am giving you\n\n' +
        '*Actions*\n' +
        '/begin - begin a new round\n' +
        '/ready - join the current round\n' +
        '/done - complete the current round\n\n' +
        '*Bot Settings* [Admin]\n' +
        '/setdroptime - set the time limit for dropping usernames\n' +
        '/setroundtime - set the time limit for completing the round');
};

module.exports = help;
