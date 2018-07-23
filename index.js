const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN, {username: 'photo_sempai_bot'});

const session = require('telegraf/session');
const parse = require('./src/Middleware/parse');
const sender = require('./src/Middleware/sender');

const run = require('./src/Commands/run');
const ready = require('./src/Commands/ready');
const complete = require('./src/Commands/complete');

/* Start */
bot.start((ctx) => ctx.reply('Konnichiwa'));

/* Middleware */
bot.use(session());
bot.use(parse());
bot.use(sender());

/* Commands */
bot.command('run', run());
bot.command('ready', ready());
bot.command('complete', complete());

/* Execute */
bot.startPolling();
