class Person {
    constructor(args) {
        this.name = args.name;
        this.chatId = args.chatId;
        this.bot = args.bot;
        this.taskDone = false;
        this.taskSnoozeCount = 0;
        this.taskLastRemind = 0;

    }

    reminderDone() {
        this.taskDone = true;
        this.tell('Good baby');
        this.supervisor.tell(`${this.name} has done their task`);
    }

    reminderReset() {
        this.taskDone = false;
        this.taskSnoozeCount = 0;
        this.taskLastRemind = 0;
        console.log(`Reminder reset for ${this.name}`);
    }

    reminderIncrement() {
        console.log(`Incrementing reminder for ${this.name}`);
        this.taskSnoozeCount += 1;
        this.taskLastRemind = Date.now();
    }

    sendMessage(message, keyboard) {
        console.log('sending message');
        this.bot.api("sendMessage", {
                chat_id: this.chatId,
                text: message,
                reply_markup: {
                    keyboard: keyboard,
                    one_time_keyboard: true
                }
            })
            .then(json => {
                if (json.ok) {
                    return json.result;
                }
                console.error(json.description);
            })
            .then(result => {
                console.info(result);
            })
            .catch(exception => {
                console.error(exception.stack);
            });
    }

    sendReminder(args) {
      var message = args.message;
      this.supervisor = args.supervisor;
      var maxSnooze = 3;
        if (!this.taskDone && this.taskSnoozeCount < maxSnooze) {
            console.log(`Snooze counter at ${this.taskSnoozeCount}`);
            console.log(`Sending a reminder to ${this.name}`);
            this.sendMessage(message, [
                ['👍'],
                ['⏰']
            ]);
            this.reminderIncrement();
            setTimeout(() => this.sendReminder(args), 5000);
        } else if (this.taskDone) {
            console.log(`Reminder finished for ${this.name}`);
            console.log(`taskDone is ${this.taskDone}`);
        } else if (this.taskSnoozeCount >= maxSnooze) {
          this.supervisor.tell(`${this.name} has not responded to "${args.message}" with a yes for ${maxSnooze} hours.`);
        }
    }

    tell(message) {
        this.sendMessage(message);
    }
    remind(args) {
        this.reminderReset();
        this.sendReminder(args);
    }
}

module.exports = Person;
