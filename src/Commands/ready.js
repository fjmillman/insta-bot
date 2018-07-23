const ready = () => (ctx) => {
    if (ctx.session.operation !== 'ready')
        return ctx.reply('You must wait until the next round begins.');

    ctx.session.participants.push({username: ctx.state.sender.user.username, instagram: ctx.state.command.args[0]});

    return ctx.reply(`${ctx.state.sender.user.first_name}, you are in.`);
};

module.exports = ready;
