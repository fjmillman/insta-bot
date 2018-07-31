/**
 *  The 'setdroptime' command allows the administrators of the photo-sempai-bot to adjust the drop time.
 */
const setdroptime = () => (ctx) => {
    /* Prevent non-administrators from using this command */
    if (ctx.state.status !== 'creator' && ctx.state.status !== 'administrator')
        return ctx.reply('Only the Sensei can use this command.');

    /* Prevent settings being changed during a round */
    if (ctx.session.operation !== 'idle')
        return ctx.reply('Settings cannot be changed during a round.');

    /* Avoid incorrect parsing of the arguments */
    if (ctx.command.args.length !== 1)
        return ctx.reply('The /setdroptime command must be followed by a value to set it to.');

    /* Check that the given value is acceptable */
    if (typeof ctx.command.args[0] !== 'number' && !ctx.command.args[0] % 5 && ctx.command.args[0] < 10)
        return ctx.reply(`The drop time must be at least 2 minutes long.`);

    /* Set the round time */
    ctx.session.dropTime = ctx.command.args[0];
    return ctx.reply(`The time limit for dropping usernames has been set to ${ctx.session.dropTime} minutes.`);
};

module.exports = setdroptime;
