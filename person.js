class Person {
    constructor(args) {
        this.name = args.name;
        this.chatId = args.chatId;
        this.bot = args.bot;
    }

    sendMessage(message, keyboard) {
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

    tell(message) {
        this.sendMessage(message);
    }
    remind(message) {
        this.sendMessage(message, [
            ['👍'],
            ['⏰']
        ]);
    }
}

module.exports = Person;
