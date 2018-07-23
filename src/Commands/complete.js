const complete = () => (ctx) => {
    if (ctx.session.operation !== 'in progress')
        return ctx.reply('The round has not begun yet.');

    let found = false;

    for (let i = 0; i < ctx.session.participants; i++) {
        if (ctx.session.participants[i].username === ctx.state.sender.user.username) {
            ctx.session.participants.splice(i);
            found = true;
        }
    }

    if (!found)
        return ctx.reply(`${ctx.state.sender.user.first_name}, you did not join this round.`);

    return ctx.reply(`Well done ${ctx.state.sender.user.first_name}!`);
};

module.exports = complete;
