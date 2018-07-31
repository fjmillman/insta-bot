const sleep = require('../sleep');

/**
 *  The 'begin' command allows a round to be begin if its state is set to 'idle'. It handles all of the processing
 *  with checking whether users have joined in on the round and whether they have completed their tasks, sending
 *  messages back to the group.
 */
const begin = () => async (ctx) => {
    /* Set operation to 'idle' if it has not been set */
    if (typeof ctx.session.operation === 'undefined')
        ctx.session.operation = 'idle';

    /* Prevent a round from being started if one already exists */
    if (ctx.session.operation !== 'idle')
        return ctx.reply('A round is already in progress.');

    /* Initialise the drop time to 5 minutes if has not been set */
    if (typeof ctx.session.dropTime !== 'number') {
        ctx.session.dropTime = 5;
    }

    /* Initialise the round time to 30 minutes if has not been set */
    if (typeof ctx.session.roundTime !== 'number') {
        ctx.session.roundTime = 30;
    }

    /* Initialise the current round into the 'ready' state */
    ctx.session.participants = [];
    ctx.session.operation = 'ready';
    ctx.session.startTime = Date.now();

    /* Set the remaining drop time to the drop time and inform the users before waiting until there is a minute left */
    let remainingDropTime = ctx.session.dropTime;
    ctx.reply(`You have ${remainingDropTime} minutes to drop your instagram username.`);
    await sleep(ctx.session.dropTime - 1);

    /* Update the remaining drop time to the last minute left and inform the users before waiting a minute */
    ctx.reply(`You have 1 minute to drop your instagram username.`);
    await sleep(1);

    /* Send a message back if there are no participants taking part and cancel the round */
    if (ctx.session.participants.length === 0) {
        ctx.session.operation = 'idle';
        return ctx.reply('Round has been ended as no-one is taking part.');
    }

    /* Begin the round by sending the list of instagram usernames to the users */
    ctx.reply('Let us begin!');
    let remainingRoundTime = ctx.session.roundTime;
    ctx.reply(`You have ${remainingRoundTime} minutes to work your way through the following list:`);
    for (let i = 0; i < ctx.session.participants.length; i++)
        ctx.replyWithMarkdown(`[${ctx.session.participants[i].instagram}](instagram.com/${ctx.session.participants[i].instagram})`);

    /* Update the current session into the 'in progress' state and wait 5 minutes */
    ctx.session.operation = 'in progress';
    ctx.session.startTime = Date.now();
    await sleep(5);

    /* Every 5 minutes if any users have not completed their tasks they are informed until the session time is over */
    do {
        ctx.reply('The following have yet to complete the list:');
        for (let i = 0; i < ctx.session.participants.length; i++)
            ctx.reply(`@${ctx.session.participants[i].username}`);
        remainingRoundTime -= 5;
        ctx.reply(`You have ${remainingRoundTime} minutes left.`);
        await sleep(5);
    } while (ctx.session.participants.length > 0 && remainingRoundTime > 0);

    /* If there are any users left who have not completed their task, they are given a warning */
    if (ctx.session.participants.length > 0) {
        ctx.reply('This is a warning for the following who did not complete the list:');
        for (let i = 0; i < ctx.session.participants.length; i++)
            ctx.reply(`@${ctx.session.participants[i].username}`);
    }

    /* The round is complete and the state is set to 'idle' */
    ctx.session.operation = 'idle';
    return ctx.reply('Round is complete.');
};

module.exports = begin;
