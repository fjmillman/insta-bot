/**
 * The 'done' command allows a user to declare that they have completed their tasks and so are removed from the
 * round on completion to avoid being warned at the end.
 */
const done = () => (ctx) => {
    /* Prevents the user from declaring themselves as done if the round is not 'in progress' */
    if (ctx.session.operation !== 'in progress')
        return ctx.reply('The round has not begun yet.');

    /* Remove the user from this round if they joined in  */
    for (let i = 0; i < ctx.session.participants; i++) {
        if (ctx.session.participants[i].username === ctx.state.sender.user.username) {
            ctx.session.participants.splice(i);
            return ctx.reply(`Well done ${ctx.state.sender.user.first_name}!`);
        }
    }

    /* If the user could not be found, inform the user that they are not a part of this round. */
    return ctx.reply(`${ctx.state.sender.user.first_name}, you are not currently in this round.`);
};

module.exports = done;
