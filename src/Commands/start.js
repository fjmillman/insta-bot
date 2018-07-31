/**
 *  The 'start' command should be run automatically on startup of the bot ensuring its status is initialised.
 */
const start = () => (ctx) => {
    /* Initialise bot variables */
    ctx.session.operation = 'idle';
    ctx.session.dropTime = 2;
    ctx.session.roundTime = 10;

    /* Send a cool message back to welcome users */
    return ctx.reply('Konnichiwa! I am the Photo Sempai Bot. Check out my current settings at /settings and if you ' +
        'ever need any help on the commands I offer, just use /help.');
};

module.exports = start;
