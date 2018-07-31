/**
 * The 'ready' command allows a user to add themselves into the session in order to take part.
 */
const ready = () => (ctx) => {
    /* Prevents users from joining the round when it is 'idle' or 'in progress' */
    if (ctx.session.operation !== 'ready')
        return ctx.reply('You must wait until the next round begins.');

    if (ctx.state.command.splitArgs.length === 0)
        return ctx.reply('You must provide an instagram username in order to take part.');

    /* Check that the user has not already added themselves to the round */
    for (let i = 0; i < ctx.session.participants.length; i++) {
        if (ctx.state.username === ctx.session.participants[i].username)
            return ctx.reply(`@${ctx.state.username}, you have already joined this round.`)
    }

    /* Add the user and their instagram username into the list */
    ctx.session.participants.push({username: ctx.state.username, instagram: ctx.state.command.splitArgs[0]});

    return ctx.reply(`@${ctx.state.username}, you are now a part of this round.`);
};

module.exports = ready;
