const sleep = require('../sleep');

const run = () => (ctx) => {
    if (ctx.session.operation === 'ready' || ctx.session.operation === 'in progress')
        return ctx.reply('A session is already in progress.');

    ctx.session.participants = [];
    ctx.session.operation = 'ready';

    ctx.reply('You have 5 minutes to drop your instagram username.');
    sleep(240).then(ctx.reply('You have 1 minute to drop your instagram username.'));
    sleep(60).then((ctx) => {
        ctx.reply('Let us begin!');
        ctx.session.operation = 'in progress';
        ctx.session.startTime = Date.now();
        ctx.reply('You have 30 minutes to work your way through the following list:');
    });

    for (let i = 0; i < ctx.session.participants.length; i++) {
        ctx.reply(`${ctx.session.participants[i].instagram}`);
    }

    let timeLeft = 30;

    while (ctx.session.participants.length = 0 || timeLeft > 0) {
        sleep(300).then((ctx) => {
            ctx.reply('The following have yet to complete the list:');
            for (let i = 0; i < ctx.session.participants.length; i++) {
                ctx.reply(`@${ctx.session.participants[i].username}`);
            }
            if (timeLeft =- 5 > 0)
                ctx.reply(`You have ${timeLeft} minutes left.`);
        });
    }

    if (ctx.session.participants.length > 0) {
        ctx.reply('This is a warning for the following who did not complete the list:');
        for (let i = 0; i < ctx.session.participants.length; i++) {
            ctx.reply(`@${ctx.session.participants[i].username}`);
        }
    }

    ctx.session.operation = 'idle';
    return ctx.reply('Session is complete.');
};

module.exports = run;
