/* Get the information of the chat member that sent a command */
module.exports = () => (ctx, next) => {
    ctx.state.username = ctx.message.from.username;
    ctx.state.status = ctx.chat.status;
    return next();
};
