const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Hello World'));
bot.hears('hello', (ctx) => ctx.reply('Hello to you too!'));
bot.command('test', ({ reply }) => reply('Yo'));

bot.startPolling();
