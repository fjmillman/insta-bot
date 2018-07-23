/* Get the chat member that sent a command */
const sender = () => (ctx, next) => {
    ctx.state.sender = ctx.getChatMember(ctx.from.id);
    return next();
};

module.exports = sender;
