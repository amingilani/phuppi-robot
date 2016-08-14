"use strict";

// scheduler
var later = require('later');
later.date.UTC(); // all dates and time are defined in UTC

// load the events
const event = require('./events');

// setup the bot
const BOT_TOKEN = process.env.BOT_TOKEN;
const Bot = require('./bot');
const bot = new Bot(BOT_TOKEN);
bot.getUpdates();

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

// upon a successful reply
event.on('message', update => {
  console.log(update);
  // { update_id: 12514543,
  // message:
  //  { message_id: 103,
  //    from:
  //     { id: 176255627,
  //       first_name: 'Amin Shah',
  //       last_name: 'Gilani',
  //       username: 'amingilani' },
  //    chat:
  //     { id: 176255627,
  //       first_name: 'Amin Shah',
  //       last_name: 'Gilani',
  //       username: 'amingilani',
  //       type: 'private' },
  //    date: 1471164157,
  //    text: 'this is a message' } }
switch (update.message.chat.id.toString()) {
  case izza.chatId:
    if (update.message.text === '👍') izza.reminderDone();
    break;
  case amin.chatId:
    if (update.message.text === '👍') amin.reminderDone();
    break;
  default:
    dude = new Person({
      name: "dude",
      chatId: update.message.chat.id,
      bot: bot
    });
    dude.tell("I'm not your phuppi, stop messaging me.");
}});

// the actual app

amin.remind({
  message: 'hello',
  supervisor: amin
});
