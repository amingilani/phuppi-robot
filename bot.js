const event = require('./events');

const BotFather = require('botfather');
class MyBot extends BotFather {

    /**
     * @param {string} token
     * @see https://core.telegram.org/bots#6-botfather
     */
    constructor(token) {
        super(token);
        this.api('getMe')
            .then(json => {
                if (json.ok) {
                    return json.result;
                }
                console.error(json.description);
            })
            .then(bot => {
                console.info(`@${bot.username} online :)`);
            })
            .catch(exception => {
                console.error(exception.stack);
            });
    }

    getUpdates(parameters = {
        limit: 100,
        timeout: 60 * 2
    }) {
        this.api('getUpdates', parameters)
            .then(json => {
                if (json.ok) {
                    return json.result;
                }
                console.error(json.description);
                setTimeout(() => this.getUpdates(parameters), 5000);
            })
            .then(updates => {
                for (let update of updates) {
                    this.onReceiveUpdate(update);
                }
                // offset = update_id of last processed update + 1
                if (updates.length > 0) {
                    const identifiers = updates.map((update) =>
                        update.update_id
                    );
                    parameters.offset = Math.max.apply(Math, identifiers) + 1;
                }
                this.getUpdates(parameters);
            })
            .catch(exception => {
                console.error(exception.stack);
                setTimeout(() => this.getUpdates(parameters), 5000);
            });
    }

    /**
     * @param {Object} update
     * @see https://core.telegram.org/bots/api#update
     */
    onReceiveUpdate(update) {
        event.emit('message', update);
    }

}

module.exports = MyBot;
