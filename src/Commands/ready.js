/**
 * The 'ready' command allows a user to add themselves into the session in order to take part.
 */
const ready = () => (ctx) => {
    /* Prevents users from joining the round when it is 'idle' or 'in progress' */
    if (ctx.session.operation !== 'ready')
        return ctx.reply('You must wait until the next round begins.');

    /* Check that the user has not already added themselves to the round */
    for (let i = 0; i < ctx.session.participants.length; i++) {
        if (ctx.state.sender.user.username === ctx.session.participants[i].username)
            return ctx.reply(`${ctx.state.sender.user.first_name}, you have already joined this round.`)
    }

    /* Add the user and their instagram username into the list */
    ctx.session.participants.push({username: ctx.state.sender.user.username, instagram: ctx.state.command.args[0]});

    return ctx.reply(`${ctx.state.sender.user.first_name}, you are now a part of this round.`);
};

module.exports = ready;
