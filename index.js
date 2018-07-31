/* Telegraf Dependencies */
const Telegraf = require('telegraf');
const express = require('express');

/* Middleware Dependencies */
const session = require('telegraf/session');
const parse = require('telegraf-command-parts');
const user = require('./src/Middleware/user');

/* Command Dependencies */
const start = require('./src/Commands/start');
const settings = require('./src/Commands/settings');
const help = require('./src/Commands/help');
const begin = require('./src/Commands/begin');
const ready = require('./src/Commands/ready');
const done = require('./src/Commands/done');
const setdroptime = require('./src/Commands/setdroptime');
const setroundtime = require('./src/Commands/setroundtime');

/* Bot Set-up */
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.telegram.getMe().then((botInformation) => { bot.options.username = botInformation.username; });

/* Middleware */
bot.use(session());
bot.use(parse());
bot.use(user());

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

/* Express App Set-up */
const app = express();
app.get('/', (request, response) => { response.send('Hello World!'); });
app.listen(process.env.PORT, () => { console.log(`Photo Sempai Bot is listening on port ${process.env.PORT}.`); });

/* Webhook Set-up */
app.use(bot.webhookCallback(`/${process.env.SECRET_COMMAND}`));
bot.telegram.setWebhook(`https://photo-sempai-bot.now.sh/${process.env.SECRET_COMMAND}`);

/* Error Handler */
bot.catch((error) => { console.log('Error', error) });
