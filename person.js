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
                    keyboard: keyboard
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
        sendMessage(message);
    }
    remind(message) {
        sendMessage(message, [{
            text: '👍'
        }, {
            text: '⏰'
        }]);
    }
}

module.exports = Person;
