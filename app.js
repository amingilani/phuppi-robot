const TOKEN = process.env.TOKEN;

var debugMessage = TOKEN ? TOKEN : "no token found";

console.log(debugMessage);

const BotFather = require('botfather');
const bf = new BotFather(TOKEN);

bf.api('getMe')
    .then(json => {
        if (json.ok) {
            return json.result;
        }
        console.error(json.description);
    })
    .then(bot => {
        console.info(`Your bot is @${bot.username}, right? :)`);
    })
    .catch(exception => {
        console.error(exception.stack);
    });
