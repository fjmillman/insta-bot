const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN, { username: 'photo_sempai_bot' });

const session = require('telegraf/session');
const parse = require('./src/Middleware/parse');
const sender = require('./src/Middleware/sender');

const start = require('./src/Commands/start');
const settings = require('./src/Commands/settings');
const help = require('./src/Commands/help');

const begin = require('./src/Commands/begin');
const ready = require('./src/Commands/ready');
const done = require('./src/Commands/done');

const setdroptime = require('./src/Commands/setdroptime');
const setroundtime = require('./src/Commands/setroundtime');

/* Set the webhook for the bot */
bot.telegram.setWebhook(`${process.env.URL}/bot${process.env.BOT_TOKEN}`);
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, parseInt(process.env.PORT));

/* Middleware */
bot.use(session());
bot.use(parse());
bot.use(sender());

/* Global Commands */
bot.start(start());
bot.settings(settings());
bot.help(help());

/* Commands */
bot.command('begin', begin());
bot.command('ready', ready());
bot.command('done', done());

/* Admin Commands */
bot.command('setdroptime', setdroptime());
bot.command('setroundtime', setroundtime());
