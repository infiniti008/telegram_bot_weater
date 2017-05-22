var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var path_to_user = './user.json';
// var user = {};

function Users() {}
var user = new Users();

Users.prototype.exist = function(id) {
    if (user[id]) {
        console.log('Object exist');
    } else {
        console.log('Object don\'t exist');
        user[id] = new User(id);
    }
}

function User(id) {
    var us = require(path_to_user)[id];
    // console.log(users);
    if (us) {
        console.log('Load data from JSON');
        this.id = us.id;
        this.time = us.time;
    } else {
        console.log('Create new user');
        this.id = id;
        this.time = [1, 2, 4];
    }
}

User.prototype.writeTo = function(id) {
    var us = require(path_to_user);
    us[id] = user[id];
    var to_file = JSON.stringify(us);
    fs.writeFileSync(path_to_user, to_file);
    console.log('Write success');
};

var command = {
    '/start': ' - Начало диалога',
    '/stop': ' - Окончание диалога',
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

    bot.on('message', function(msg) {
        if (msg.entities[0].type != 'bot_command') {
            var chatId = msg.chat.id;
            console.log('This is bot command');
            console.log(msg.text);
            // console.log(add_torr[chatId]);
            // readFrom();
            bot.sendMessage(chatId, 'Uncnow command');
        }
    });

    bot.onText(/\/echo (.+)/, function(msg, match) {
        var chatId = msg.chat.id;
        var resp = match[1];
        // console.log(chatId);
        bot.sendMessage(chatId, resp);
    });

    bot.onText(/\/start/, function(msg, match) {
        var chatId = msg.chat.id;
        user.exist(chatId);

        user[chatId].tru = 'sdsdsd';
        // user[chatId].writeTo(chatId);
        // users[chatId] = new User(chatId);

        bot.sendMessage(chatId, 'Добро пожаловать');
    });
    bot.onText(/\/stop/, function(msg, match) {
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
        if (match[1].length != 5) {
            bot.sendMessage(chatId, 'Введите время в нужном формате - ЧЧ:ММ');
        } else if (match[1].charAt(2) != ':') {
            bot.sendMessage(chatId, 'Не забудте разделить часы и минуты символом ":"');
        } else if ((match[1].substring(0, 2) * 1) >= 25) {
            bot.sendMessage(chatId, 'Введите часы в 24-х часовом формате');
        } else if ((match[1].substring(3, 5) * 1) >= 61) {
            bot.sendMessage(chatId, 'Введите минуты в 60-и минутном формате');
        } else {
            bot.sendMessage(chatId, 'Мы сохранили ваше время! Можете добавить еще одно время используя ту-же команду /add_time');
            // user.time.push(match[1]);
            // user.writeTo();
        }


    });
    bot.onText(/\/add_time/, function(msg, match) {
        if (msg.text == '/add_time') {
            var chatId = msg.chat.id;
            bot.sendMessage(chatId, 'Введите команду в следующем формате: /add_time ЧЧ:ММ');
        }
    });


    bot.onText(/\/show_time/, function(msg, match) {
        var chatId = msg.chat.id;
        user[chatId] = new User(chatId);
        // user[chatId].writeTo();
        console.log(user[chatId]);

        // user.readFrom();
        // console.log(user);
        var mes = 'Ваши текущие времена:\n';
        for (var p in user.time) {
            mes += user.time[p] + '\n';
        }
        bot.sendMessage(chatId, mes);
        // users[chatId].readFrom();
    });


}