var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var path_to_user = './user.json';

var time = [];

function User {
    this.kjhnkjnkjnkjn
}

User.prototype.showAge = function() {
    console.log( this.age)
}

function readFrom() {
    this = require(path_to_user).;
    console.log(this);
}
// function writeTo() {
//     var to_file = JSON.stringify(user);
//     fs.writeFileSync(path_to_user, to_file);
//     console.log('Write siccess');
// }

var command = {
    '/echo': ' - Команда ЭХО.',
    '/help': ' - Список команд',
    '/add_time': ' - Добавить время',
    '/show_time': ' - Показать текущие времена'
};

var token = '268377689:AAEehpljdqiY6qITewLNPUkbe60Kbszl95w';

start_bot();

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
    
    
    bot.onText(/\/add_time (.+)/, function(msg, match) {
        var chatId = msg.chat.id;
        // console.log(match[1].substring(3, 5)*1);
        if(match[1].length != 5){
            bot.sendMessage(chatId, 'Введите время в нужном формате - ЧЧ:ММ');
        }
        else if(match[1].charAt(2) != ':'){
            bot.sendMessage(chatId, 'Не забудте разделить часы и минуты символом ":"');
        }
        else if((match[1].substring(0, 2) * 1) >= 25){
            bot.sendMessage(chatId, 'Введите часы в 24-х часовом формате');
        }
        else if((match[1].substring(3, 5) * 1) >= 61){
            bot.sendMessage(chatId, 'Введите минуты в 60-и минутном формате');
        }
        else{
            bot.sendMessage(chatId, 'Мы сохранили ваше время! Можете добавить еще одно время используя ту-же команду /add_time');
            time.push(match[1]);
        }
       
        
    });
    
    bot.onText(/\/add_time/, function(msg, match) {
        if(msg.text == '/add_time'){
            var chatId = msg.chat.id;
            bot.sendMessage(chatId, 'Введите команду в следующем формате: /add_time ЧЧ:ММ');
        }
    });
    
    bot.onText(/\/show_time/, function(msg, match) {
            var chatId = msg.chat.id;
            bot.sendMessage(chatId, time);
            console.log(time);
    });
    
    
    
        bot.on('message', function(msg) {
            if(msg.entities[0].type != 'bot_command'){
                var chatId = msg.chat.id;
                console.log('This is bot command');
                console.log(msg.text);
                // console.log(add_torr[chatId]);
                // readFrom();
                bot.sendMessage(chatId, 'Uncnow command');
            }
        });
    
}