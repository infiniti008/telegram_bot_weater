var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');




var command = {
    '/echo': ' - Команда ЭХО.'
};


var token = '268377689:AAEehpljdqiY6qITewLNPUkbe60Kbszl95w';

function start_bot() {
    var bot = new TelegramBot(token, { polling: true });
    console.log('We start telegramm bot!');

    bot.onText(/\/echo (.+)/, function(msg, match) {
        var chatId = msg.chat.id;
        var resp = match[1];
        bot.sendMessage(chatId, resp);
    });

    bot.onText(/\/help/, function(msg, match) {
        var help = 'Я умею выполнять следующие команды: \n';
        for (var j in command) {
            help += j + command[j] + '\n';
        }
        var chatId = msg.chat.id;
        bot.sendMessage(chatId, help);
    });

    bot.on('message', function(msg) {
        var chatId = msg.chat.id;
        console.log(msg);
        // console.log(add_torr[chatId]);
    });
}