class Person {
    constructor(args) {
        this.name = args.name;
        this.chatId = args.chatId;
        this.bot = args.bot;
    }

    reminderDone() {
        this.taskDone = true;
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
        if (!this.taskDone && this.taskSnoozeCount < 3) {
            console.log(`Snooze counter at ${this.taskSnoozeCount}`)
            console.log(`Sending a reminder to ${this.name}`);
            this.sendMessage(message, [
                ['👍'],
                ['⏰']
            ]);
            this.reminderIncrement();
            setTimeout(() => this.sendReminder(args), 5000);
        } else if (this.taskDone === true) {
            console.log(`Reminder finished for ${this.name}`);
        } else if (this.taskSnoozeCount > 4) {
          args.supervisor.tell(`$(this.name) has not responded to "${args.message}" for three hours.`);
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
