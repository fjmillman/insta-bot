const sleep = require('../sleep');

const run = () => (ctx) => {
    if (ctx.session.operation !== null)
        return ctx.reply('A session is already in progress.');

    ctx.session.participants = [];
    ctx.session.operation = 'ready';

    ctx.sendMessage(ctx.from_chat_id, 'You have 5 minutes to drop your instagram username.');
    sleep(240).then(ctx.sendMessage(ctx.from_chat_id, 'You have 1 minute to drop your instagram username.'));
    sleep(60).then((ctx) => {
        ctx.sendMessage(ctx.from_chat_id, 'Let us run!');
        ctx.session.operation = 'in progress';
        ctx.session.startTime = Date.now();
        ctx.sendMessage(ctx.from_chat_id, 'You have 30 minutes to work your way through the following list:');
    });

    for (let i = 0; i < ctx.session.participants.length; i++) {
        ctx.sendMessage(ctx.from_chat_id, `${ctx.session.participants[i].instagram}`);
    }

    let timeLeft = 30;

    while (ctx.session.participants.length = 0 || timeLeft > 0) {
        sleep(300).then((ctx) => {
            ctx.sendMessage(ctx.from_chat_id, 'The following have yet to complete the list:');
            for (let i = 0; i < ctx.session.participants.length; i++) {
                ctx.sendMessage(ctx.from_chat_id, `@${ctx.session.participants[i].username}`);
            }
            if (timeLeft =- 5 > 0)
                ctx.sendMessage(ctx.from_chat_id, `You have ${timeLeft} minutes left.`);
        });
    }

    if (ctx.session.participants.length > 0) {
        ctx.sendMessage(ctx.from_chat_id, 'This is a warning for the following who did not complete the list:');
        for (let i = 0; i < ctx.session.participants.length; i++) {
            ctx.sendMessage(ctx.from_chat_id, `@${ctx.session.participants[i].username}`);
        }
    }

    ctx.session.operation = null;
    return ctx.reply('Session is complete.');
};

module.exports = run;
