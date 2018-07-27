/**
 *  The 'settings' command allows the users to see what settings have been set.
 */
const settings = () => (ctx) => {
    return ctx.reply('The following settings are in place for me:\n\n' +
        `/setdroptime - ${ctx.session.dropTime}\n` +
        `/setroundtime - ${ctx.session.roundTime}\n\n` +
        '*[Admin]* Run the commands above to change them');
};

module.exports = settings;
