// setup the bot
const BOT_TOKEN = process.env.BOT_TOKEN;
const Bot = require('./bot');
const bot = new Bot(BOT_TOKEN);

// setup the people
const Person = require('./person');
var izza = new Person({
  name: "Izza",
  chatId: "186495904",
  bot: bot
});

var amin = new Person({
  name: "Amin",
  chatId: "176255627",
  bot: bot
});


amin.tell("you're awesome!");
