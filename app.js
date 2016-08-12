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

// the actual app

var pillsReminderSchedule = later.parse.text('at 5:00pm'); // UTC time

var pillsReminders = function() {
  amin.taskDone = false;
};

function ifNotDoneRemind(person, message) {
  if (!person.taskDone && person.counter <= 3) {
    person.remind(message);
    person.counter += 1;
    var s = later.parse.text("ever 1 hour");
    later.setInterval(ifNotDoneRemind(person, mesa), s);
  } else {
    other_person.tell("person.name is an idiot");
  }
}
