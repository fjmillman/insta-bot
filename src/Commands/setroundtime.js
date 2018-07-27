/**
 *  The 'setroundtime' command allows the administrators of the photo-sempai-bot to adjust the round time.
 */
const setroundtime = () => (ctx) => {
    /* Prevent non-administrators from using this command */
    if (ctx.state.sender.status !== 'creator' && ctx.state.sender.status !== 'administrator')
        return ctx.reply('Only the Sensei can use this command.');

    /* Prevent settings being changed during a round */
    if (ctx.session.operation !== 'idle')
        return ctx.reply('Settings cannot be changed during a round.');

    /* Avoid incorrect parsing of the arguments */
    if (ctx.command.args.length !== 1)
        return ctx.reply('The /setroundtime command must be followed by a value to set it to.');

    /* Check that the given value is acceptable */
    if (typeof ctx.command.args[0] !== 'number' && !ctx.command.args[0] % 5 && ctx.command.args[0] < 10)
        return ctx.reply(`The round time must be a multiple of 5 and at least 10.`);

    /* Set the round time */
    ctx.session.roundTime = ctx.command.args[0];
    return ctx.reply(`The time limit for each round has been set to ${ctx.session.roundTime} minutes.`);
};

module.exports = setroundtime;
