const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const webshot = require('webshot');
const cheerio = require("cheerio");
const needle = require("needle");
const request = require("request");

const mongoose = require('mongoose');
const userbase = require('./userbase');
const SaveChannel = require('./saveChannel');

const nameChannel = require('./nameChannel');
const lk= require('./section/lk');
const like = require('./section/like');

const fs = require('fs');
const express = require('express');
const app = express();

app.use('/', express.static('public'));

app.listen(process.env.PORT || 8080);

mongoose.connect('mongodb://top:88993421q@ds022408.mlab.com:22408/top', { useNewUrlParser: true });

const stepHandler = new Composer();

const addChannel = new WizardScene('addChannel',

    stepHandler,
    (ctx) => {
    ctx.reply('Добавте данный бот в ваш канал, после чего укажите ваш канал в формате "@название_канала"',{
    reply_markup:{
        keyboard:[
            ['Отмена']
        ],
        resize_keyboard: true
    }
});
return ctx.wizard.next()
},
    (ctx) => {
    if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
        bot.telegram.sendMessage(ctx.message.chat.id, '...', {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика бота', '➕Добавить канал'],
                    ['♻️Share', '📢Help', '👍🏻Like'],
                    ['🔑Админка']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        });
        return ctx.scene.leave()
    }
    else {
        const user = userbase({
            'id_user': `${ctx.message.chat.id}`,
            'nameChannel': `${ctx.message.text}`
        });

        ctx.telegram.getChatMember(ctx.message.id = `${ctx.message.text}`, ctx.message.from.id = 324289197).then(err => {
            if(err.status == 'left'){ctx.reply('must not')}
    else{
            user.save(() => {
                console.log('save userChat')
        });
            ctx.reply('Ваш канал добавлен!', {
                reply_markup: {
                    keyboard: [
                        ['add']
                    ],
                    resize_keyboard: true
                }
            })
        }

    }).catch(erro => {
            if (erro.code == 400) {
            ctx.reply('неверно');
            console.log('yeees')
        }
    });
        ctx.session.counter = ctx.message.text;

        return ctx.scene.leave()
    }
},
    (ctx) => {
    if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
        bot.telegram.sendMessage(ctx.message.chat.id, '...', {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика бота', '➕Добавить канал'],
                    ['♻️Share', '📢Help', '👍🏻Like'],
                    ['🔑Админка']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        });
        return ctx.scene.leave()
    } else {
        ctx.reply('Отправлено!', {
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика бота', '➕Добавить канал'],
                    ['♻️Share', '📢Help', '👍🏻Like'],
                    ['🔑Админка']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        });
        const html = `
${ctx.message.text}

<b>Так же вам доступны рекламные функции за отдельную плату.</b>
        `
        ctx.telegram.sendMessage(ctx.message.chat.id = `${ctx.session.counter}`, html, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Функции ₽',
                            callback_data: 'many'
                        }
                    ]
                ],
            },
        });
        return ctx.scene.leave()
    }
}
);

const restriction = new WizardScene('restriction',

    stepHandler,
    (ctx) => {
        ctx.reply('Вам есть 18 лет?',{
            reply_markup:{
                keyboard:[
                    ['Да'],
                    ['Нет']
                ],
                resize_keyboard: true
            }
        });
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Нет' || ctx.message.text === '/start') {
            bot.telegram.sendMessage(ctx.message.chat.id, 'Возвращайтесь когда вам будет 18 лет', {
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['Уже 18']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
        }
        else if (ctx.message.text === 'Уже 18') {
            bot.telegram.sendMessage(ctx.message.chat.id, 'Теперь ты с Нами', {
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['Да'],
                        ['Нет']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            return ctx.scene.leave()
        }
        else {
            ctx.reply('okey');
            return ctx.scene.leave()
        }
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
            bot.telegram.sendMessage(ctx.message.chat.id, '...', {
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика бота', '➕Добавить канал'],
                        ['♻️Share', '📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            return ctx.scene.leave()
        } else {
            ctx.reply('Отправлено!', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика бота', '➕Добавить канал'],
                        ['♻️Share', '📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            const html = `
${ctx.message.text}

<b>Так же вам доступны рекламные функции за отдельную плату.</b>
        `
            ctx.telegram.sendMessage(ctx.message.chat.id = `${ctx.session.counter}`, html, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Функции ₽',
                                callback_data: 'many'
                            }
                        ]
                    ],
                },
            });
            return ctx.scene.leave()
        }
    }
);

const addsaveChannel = new WizardScene('addsaveChannel',

    stepHandler,

    (ctx) => {
    ctx.reply('Укажите интерес',{
    reply_markup:{
        keyboard:[
            ['Отмена']
        ],
        resize_keyboard: true
    }
});
return ctx.wizard.next()
},
(ctx) => {
    ctx.reply('Укажите ссылку',{
        reply_markup:{
            keyboard:[
                ['Отмена']
            ],
            resize_keyboard: true
        }
    });
    ctx.session.counter = ctx.message.text;
    return ctx.wizard.next()
},
// (ctx) => {
//     needle.get(`t.me/${ctx.message.text}`, function (err, res) {
//
//         if (err) throw err;
//         var $ = cheerio.load(res.body);
//
//         const info = $('.tgme_page_description').text();
//         const number = $('.tgme_page_extra').text();
//         const name = $('.tgme_page_title').text();
//
//         const user = sex({
//             channel: `@${ctx.message.text}`,
//             name_channel: name.replace(/^\s*(.*)\s*$/, '$1'),
//             members: number.replace(/\D+/g,""),
//             info: info.replace(/^\s*(.*)\s*$/, '$1')});
//
//         user.save(() => {
//             ctx.reply('This channel saved', {
//                 reply_markup: {
//                 keyboard: [
//                     ['add']
//                 ],
//                     resize_keyboard:true
//             }
//         });
//             return ctx.scene.leave()
//         })
//
//     });
//
// },
(ctx) => {
    needle.get(`${ctx.message.text}`, function (err, res) {

        if (err) throw err;
        var $ = cheerio.load(res.body);

        const name = $('.user__name').text();
        const year = $('.user__title').text();
        const picture = $('.user__img').attr('src');
        console.log(year);
        const user = sex({
            name: name,
            years: year.replace(/[^0-9]/g, ''),
            pictures: picture,
            info: ctx.session.counter,
        });

        user.save(() => {
            ctx.reply('This channel saved', {
            reply_markup: {
                keyboard: [
                    ['add']
                ],
                resize_keyboard:true
            }
        });
        return ctx.scene.leave()
    })

    });

}
);

const help = new WizardScene('help',

    stepHandler,
    (ctx) => {
        const markdown = `
📣 *Help*:

\`Если имеются какие либо проблемы, пишем сюда:\`.
`
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['Отмена']
                ],
                resize_keyboard: true
            },
        });
        console.log(typeof ctx.message.text);
        return ctx.wizard.next()
    },
    (ctx) => {

        const id = ctx.message.chat.id;
        const admin = 549073144;
        const forward = 246978293;
        const txt = ctx.message.text;

        if (txt === 'Отмена') {
            if(id === admin){
                ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                    reply_markup: {
                        keyboard: [
                            ['🔞Познакомиться', 'Войти'],
                            ['⚠️Информация', '➕Подписка'],
                            ['📣Help', '👍🏻Like']
                        ],
                        resize_keyboard: true
                    },
                });
                return ctx.scene.leave()
            }else {
                ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                    reply_markup: {
                        keyboard: [
                            ['🔞Познакомиться', 'Войти'],
                            ['⚠️Информация', '➕Подписка'],
                            ['📣Help', '👍🏻Like']
                        ],
                        resize_keyboard: true
                    },
                });
                return ctx.scene.leave();
            }
        }else{
            const html1 = `
📢 <b>Сообщение было успешно отправлено</b> ✔️

<code>В скором времени на него ответит модератор.</code>`;
            ctx.telegram.sendMessage(ctx.message.chat.id, html1,{
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['🔞Познакомиться', 'Войти'],
                        ['⚠️Информация', '➕Подписка'],
                        ['📣Help', '👍🏻Like']
                    ],
                    resize_keyboard: true
                },
            });
            const { chat, message_id, text } = ctx.message;

            ctx.telegram.forwardMessage(forward, chat.id, message_id);
            return ctx.scene.leave()
        }
    }

);

const remove = new WizardScene('remove',

    stepHandler,
    (ctx) => {
        needle.get(`https://bankiros.ru/crypto/bitcoin-rub`, function (err, res) {

            if (err) throw err;
            var $ = cheerio.load(res.body);

            const rub = $('.crypto_curr_val').text();
            const user = ctx.message.chat.id;
            lk.findOne({'user_id': user },function(err, doc) {
                const convert = rub.replace(/[^0-9]/g, '') * doc.money;
                const convert1 = rub.replace(/[^0-9]/g, '') * 0.00014964;
                const markdown = `
💳 *Сумма для вывода*:

${doc.money.toFixed(8)} *BTC* = ${convert.toFixed(3)}*₽*

*Укажите ваш биткоин адрес для вывода средств*:
        `;
                    ctx.reply(markdown,{
                        parse_mode:'Markdown',
                        reply_markup: {
                            keyboard: [
                                ['Отмена']
                            ],
                            resize_keyboard: true
                        }
                    })
            })
        });
        return ctx.wizard.next()
    },
    (ctx) => {
        const txt = ctx.message.text;
        if(txt === 'Отмена'){
            ctx.reply('Hello', {
                reply_markup: {
                    keyboard: [
                        ['Личный кабинет'],
                        ['Курс валюты']
                    ],
                    resize_keyboard:true
                }
            });
            return ctx.scene.leave()
        }else{
        needle.get(`https://bankiros.ru/crypto/bitcoin-rub`, function (err, res) {

            if (err) throw err;
            var $ = cheerio.load(res.body);

            const rub = $('.crypto_curr_val').text();
            const user = ctx.message.chat.id;
        lk.findOne({'user_id': user },function(err, doc) {
            const convert = rub.replace(/[^0-9]/g, '') * doc.money;
            const convert1 = rub.replace(/[^0-9]/g, '') * 0.00014964;
        const markdown = `
🔄 *Заявка на вывод средств*:

*Сумма*: ${doc.money.toFixed(8)} *BTC* = ${convert.toFixed(3)}*₽* 
      
*Биткоин адресс*: 
${txt}

⚠️*Заявка на вывод средств обрабатывается в течение 48часов*. 
`;
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['Личный кабинет'],
                        ['Курс валюты']
                    ],
                    resize_keyboard: true
                },
            });
            lk.updateOne({'money': doc.money, 'status': doc.status}, {'money': 0.00000001, 'status': `${doc.money.toFixed(8)} BTC = ${convert.toFixed(3)}₽`},function () {
                const markdown = `
⚠️ *Заявка на вывод средств*

${doc.money.toFixed(8)} *BTC* = ${convert.toFixed(3)}*₽*

*User_id*:
\`${user}\`
 
*BTC адрес*:                  
\`${txt} \`                  
`;
                ctx.telegram.sendMessage(ctx.message.chat.id = 549073144, markdown, {
                    parse_mode: 'Markdown'
                })
            })
    });
    });
    }
            return ctx.scene.leave()
    }

);

const deposit = new WizardScene('deposit',

    stepHandler,
    (ctx) => {
        const user = ctx.message.chat.id;
        lk.findOne({'user_id': user },function(err, doc) {
                const markdown = `
💳 *Ваш депозит*:

${doc.deposit}

*Укажите ваш биткоин адрес для снятия депозита*:

    `;
                ctx.reply(markdown, {
                    parse_mode: 'Markdown',
                    reply_markup:{
                        keyboard:[
                            ['Отмена']
                        ],
                        resize_keyboard: true
                    }
                });
        });
        return ctx.wizard.next()
    },
    (ctx) => {
        const txt = ctx.message.text;
        if(txt === 'Отмена'){
            ctx.reply('...', {
                reply_markup: {
                    keyboard: [
                        ['Личный кабинет'],
                        ['Курс валюты']
                    ],
                    resize_keyboard:true
                }
            });
            return ctx.scene.leave()
        }else{
            const user = ctx.message.chat.id;
            lk.findOne({'user_id': user },function(err, doc) {
                const markdown = `
🔄 *Заявка на снятие депозита*:

${doc.deposit}
      
*Биткоин адресс*: 
${txt}

⚠️*Заявка на вывод средств обрабатывается в течение 48часов*. 
`;
                ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                    parse_mode: 'Markdown',
                    reply_markup: {
                        keyboard: [
                            ['Личный кабинет'],
                            ['Курс валюты']
                        ],
                        resize_keyboard: true
                    },
                });
                const text = `В процессе обработки, ожидается снятие депозита
`;
                lk.updateOne({'deposit': doc.deposit, 'pass': doc.pass}, {'deposit': text, 'pass': 0},function () {
                    const markdown = `
⚠️ *Заявка на снятие депозита*

*${doc.deposit}*

*User_id*:
\`${user}\`
 
*BTC адрес*:                  
\`${txt} \`                  `;
                    ctx.telegram.sendMessage(ctx.message.chat.id = 549073144, markdown, {
                        parse_mode: 'Markdown'
                    })
                })
            });
        }
        return ctx.scene.leave()
    }

);

const buy = new WizardScene('buy',

    stepHandler,
    (ctx) => {
        ctx.reply('💳 *Выберите тип депозита:*',{
            parse_mode: 'Markdown',
            reply_markup:{
                keyboard:[
                    ['7 Дней-15%', '15 дней-30%'],
                    ['30 дней-50%'],
                    ['Отмена']
                ],
                resize_keyboard: true
            }

        });
        ctx.session.counter = ctx.message.text;
        return ctx.wizard.next()
    },
    (ctx) => {
        const txt = ctx.message.text;

        if (txt === '7 Дней-15%' || txt === '15 дней-30%' || txt === '30 дней-50%'){
            needle.get(`https://bankiros.ru/crypto/bitcoin-rub`, function (err, res) {

                if (err) throw err;
                var $ = cheerio.load(res.body);

                const rub = $('.crypto_curr_val').text();
                const user = ctx.message.chat.id;


                lk.findOne({'user_id': user },function(err, doc) {
                    const convert = rub.replace(/[^0-9]/g, '') * 0.00014964;
                    const markdown = `
💳 *Депозит*

Вами сформирован новый депозит *${txt}*, для завершения операции пополните счет.

*Адрес биткоин счета для пополнения*:
\`3N3czCFMcds9qWALTsfTsAVYQ4y8LRa6id\`

*Напоминаем, минимальная сумма пополнения составляет*:
0.00014964 *BTC* = ${convert.toFixed()}*₽* 

⚠️На пополнение депозита отведено 12 часов, после депозит будет аннулирован.   
        `;
                    ctx.reply(markdown,{
                        parse_mode:'Markdown',
                        reply_markup: {
                            keyboard: [
                                ['Депозит', 'Вывод средств'],
                                ['Назад']
                            ],
                            resize_keyboard: true
                        }
                    });
                    const text = `В процессе обработки, ожидается пополнение
Тип депозита: ${txt}
`;
                    lk.updateOne({'deposit': doc.deposit, 'key': doc.key}, {'deposit': text, 'key': 1},function () {})
                });
            });
            return ctx.scene.leave()
        }
        else if(txt === 'Отмена') {
            ctx.reply('...', {
                reply_markup: {
                    keyboard: [
                        ['Личный кабинет'],
                        ['Курс валюты']
                    ],
                    resize_keyboard:true
                }
            });
            return ctx.scene.leave()
        }
        else{
            ctx.reply('Suka');
            return ctx.wizard.next()
        }
    },
    (ctx) => {
        ctx.telegram.sendMessage(ctx.message.chat.id, `
1234
        `);
        return ctx.scene.leave()
    }

);

const subscription = new WizardScene('subscription',

    stepHandler,
    (ctx) => {
        const markdown = `
🔐 \`Введите свой\` *идентификатор* \`который вы получили при оформление подписки:\`
`;
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['Отмена']
                ],
                resize_keyboard: true
            },
        });
        console.log(typeof ctx.message.text);
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔞Познакомиться', 'Войти'],
                        ['⚠️Информация', '➕Подписка'],
                        ['📣Help', '👍🏻Like']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave()
        }else {
            const markdown = `
⚠️*Ошибка*

\`Такой пользователь не был найден, попробуйте еще раз:\`
`;
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown'
            });
        }
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔞Познакомиться', 'Войти'],
                        ['⚠️Информация', '➕Подписка'],
                        ['📣Help', '👍🏻Like']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave()
        }else {
            const markdown = `
⚠️*Ошибка*

\`Такой пользователь не был найден, попробуйте еще раз:\`
`;
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown'
            });
        }
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔞Познакомиться', 'Войти'],
                        ['⚠️Информация', '➕Подписка'],
                        ['📣Help', '👍🏻Like']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave()
        }else {
            const markdown = `
⚠️*Ошибка*

\`Такой пользователь не был найден, попробуйте еще раз:\`

*Для получения идентификатор оформите подписку.*
`;
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['➕Оформить подписку'],
                        ['Отмена']
                    ],
                    resize_keyboard: true
                },
            });
        }
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔞Познакомиться', 'Войти'],
                        ['⚠️Информация', '➕Подписка'],
                        ['📣Help', '👍🏻Like']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave()
        }
        else if (ctx.message.text === '➕Оформить подписку'){
            ctx.reply(`⬇️`,{
                reply_markup: {
                    keyboard: [
                        ['Отмена']
                    ],
                    resize_keyboard: true
                }
            });
            const markdown = `
[🔐](http://img.ipev.ru/2018/04/26/11.jpg) *Для регистрации оформите одну из следующих подписок:*
        
\`После оформление подписки нажмите на кнопку\` «*Проверить оплату*», \`что бы завершить регистрацию.\`
    `;
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '1 месяц — 199 ₽',
                                url: 'https://bit.ly/2kMhfWq'
                            }
                        ],
                        [
                            {
                                text: '2 месяца — 299 ₽',
                                callback_data: 'Временно недоступно!'
                            }
                        ],
                        [
                            {
                                text: '3 месяца — 399 ₽',
                                url: 'https://bit.ly/2xU8YZW'
                            }
                        ],
                        [
                            {
                                text: 'Пробный период — 7 дней: 99 ₽',
                                url: 'https://bit.ly/2VHl8gq'
                            }
                        ],
                        [
                            {
                                text: 'Проверить оплату',
                                callback_data: '1'
                            }
                        ]
                    ]
                },
            });
            return ctx.scene.leave()
        }
        else {
            const markdown = `
⚠️*Ошибка*

\`Такой пользователь не был найден, попробуйте еще раз:\`

*Для получения идентификатор оформите подписку.*
`;
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['➕Оформить подписку'],
                        ['Отмена']
                    ],
                    resize_keyboard: true
                },
            });
        }
    }

);

const bot = new Telegraf('324289197:AAGGak2_zEZdaV5VA5vwIwXz_6WFPUX9h3s');
const stage = new Stage();

stage.register(addChannel, addsaveChannel, restriction, subscription, help, remove, buy, deposit);
bot.use(session());
bot.use(stage.middleware());
bot.hears('📣Help', (ctx) => {
    ctx.scene.enter('help');
});

bot.hears(/start (.+)/, (ctx) => {



    const add = ctx.message.chat.id;
    const text = ctx.message.text;
    const id = text.replace(/\D+/g,"");
    const user = lk({
        user_id: ctx.message.chat.id,
        money: '0.00000001',
        members: 0,
        deposit: 'Отсутствует',
        status: 'Отсутствует',
        key: 0,
        pass: 0
    });

    lk.findOne({'user_id': add },function(err, doc) {

        if(doc != null)
        {
            if(doc.telegramId == add) {
                ctx.telegram.sendMessage(ctx.message.chat.id=`${add}`,`Вы уже заходили к нам ${ctx.from.first_name} 😉`, {
                    parse_mode: 'Markdown',
                    reply_markup: {
                        keyboard: [
                            ['🔰Каталог каналов'],
                            ['📊Статистика бота', '➕Добавить канал'],
                            ['♻️Share', '📢Help', '👍🏻Like']
                        ],
                        resize_keyboard: true
                    }
                })
            }else {
                ctx.reply('Вы уже заходили к нам)');
            }

            console.log('Айдиии', doc.telegramId, id)
        }
        else if (doc == null) {
            lk.findOne({'user_id': id },function(err, dac){
                if (dac != null){
                    user.save((err, user) => {
                        ctx.telegram.sendMessage(ctx.message.chat.id = `${add}`,`
Добро пожаловать! 
Для работы с ботом воспользуйтесь меню:`,{
                            reply_markup: {
                                keyboard:[
                                    ['🔰Каталог каналов'],
                                    ['📊Статистика бота', '➕Добавить канал'],
                                    ['♻️Share', '📢Help', '👍🏻Like']
                                ],
                                resize_keyboard: true
                            }
                        });
                        console.log('good', user)
                    });
                    lk.findOne({'user_id': id },function(err, edit) {
                        lk.updateOne({'members': dac.members, 'money': dac.money}, {'members': ++dac.members, 'money': dac.money + 0.00000092},function () {
                            ctx.telegram.sendMessage(ctx.message.chat.id = `${id}`, `
✅ Вам начислен бонус за привлеченного участника в размере 0.00000092*BTC*
`,{
                                parse_mode: 'Markdown'
                            });
                            console.log('айдикод', dac);
                            console.log('айди рефера', id)

                        })
                    })
                }
                else if(dac == null){
                    user.save((err, user) => {
                        ctx.telegram.sendMessage(ctx.message.chat.id = `${add}`,`
Hello`,{
                            reply_markup: {
                                keyboard:[
                                    ['Личный кабинет']
                                ],
                                resize_keyboard: true
                            }
                        });
                        console.log('good', user)
                    });
                }
            })

        }
    });
});

bot.command('start', (ctx) => {

    const id = ctx.message.chat.id;
    const user = lk({
        user_id: ctx.message.chat.id,
        money: '0.00000001',
        members: 0,
        deposit: 'Отсутствует',
        status: 'Отсутствует',
        key: 0,
        pass: 0
    });

    lk.findOne({'user_id': id },function(err, doc) {

        if(doc != null)
        {
            if(doc.user_id == id) {
                    ctx.reply('Hello', {
                        reply_markup: {
                            keyboard: [
                                ['Личный кабинет'],
                                ['Курс валюты']
                            ],
                            resize_keyboard:true
                        }
                    });
            }
        }
        else if (doc == null) {
            user.save(() => {
                ctx.reply('Hello', {
                    reply_markup: {
                        keyboard: [
                            ['Личный кабинет'],
                            ['Курс валюты']
                        ],
                        resize_keyboard:true
                    }
                });
            })

        }
    });
});
bot.hears('Личный кабинет', (ctx) => {
    needle.get(`https://bankiros.ru/crypto/bitcoin-rub`, function (err, res) {

        if (err) throw err;
        var $ = cheerio.load(res.body);

        const rub = $('.crypto_curr_val').text();
        const user = ctx.message.chat.id;


    lk.findOne({'user_id': user },function(err, doc) {
        const convert = rub.replace(/[^0-9]/g, '') * doc.money;
        const convert1 = rub.replace(/[^0-9]/g, '') * doc.deposit;
        const markdown = `
🖥 *Личный кабинет*       
        
*Счет*: ${doc.money.toFixed(8)} *BTC* = ${convert.toFixed(3)}*₽*

*Депозит*: 
\`${doc.deposit}\`

*Заявка на вывод средств*: 
\`${doc.status}\`

*Приглашенных участников*: ${doc.members}     
        `;
        ctx.reply(markdown,{
            parse_mode:'Markdown',
            reply_markup: {
                keyboard: [
                    ['Депозит', 'Вывод средств'],
                    ['Заработать'],
                    ['Назад']
                ],
                resize_keyboard: true
        }
        })
    });
    });
});
bot.hears('Пополнить', (ctx) => {
    const user = ctx.message.chat.id;
    lk.findOne({'user_id': user },function(err, doc) {
        if(doc.key === 0) {
            ctx.scene.enter('buy');
        }
    });
});
bot.hears('Вывод средств', (ctx) => {
    needle.get(`https://bankiros.ru/crypto/bitcoin-rub`, function (err, res) {

        if (err) throw err;
        var $ = cheerio.load(res.body);

        const rub = $('.crypto_curr_val').text();
        const user = ctx.message.chat.id;
        lk.findOne({'user_id': user },function(err, doc) {
            const convert = rub.replace(/[^0-9]/g, '') * doc.money;
            const convert1 = rub.replace(/[^0-9]/g, '') * 0.00014964;
            const markdown = `
💳 *Баланс вашего счета*:
             
${doc.money.toFixed(8)} *BTC* = ${convert.toFixed(3)}*₽* 

*Минимальная сумма для вывода средств*:

0.00014964 *BTC* = ${convert1.toFixed()}*₽* 
        `;
            ctx.reply(markdown,{
                parse_mode:'Markdown',
                reply_markup: {
                    keyboard: [
                        ['Вывести средства'],
                        ['Отмена']
                    ],
                    resize_keyboard: true
                }
            })
        })
    });
});
bot.hears('Вывести средства', (ctx) => {
    needle.get(`https://bankiros.ru/crypto/bitcoin-rub`, function (err, res) {

        if (err) throw err;
        var $ = cheerio.load(res.body);

        const rub = $('.crypto_curr_val').text();
        const user = ctx.message.chat.id;
        lk.findOne({'user_id': user },function(err, doc) {
            const convert = rub.replace(/[^0-9]/g, '') * doc.money;
            const convert1 = rub.replace(/[^0-9]/g, '') * 0.00014964;
            if (doc.money.toFixed(8) >= 0.00014964){
                ctx.scene.enter('remove');
            }
            else{const markdown = `
⚠️ *На вашем счету недостаточно средств*.

${doc.money.toFixed(8)} *BTC* = ${convert.toFixed(3)}*₽*

*Минимальная сумма для вывода*:

0.00014964 *BTC* = ${convert1.toFixed()}*₽*
  
        `;
                ctx.reply(markdown,{
                    parse_mode:'Markdown',
                    reply_markup: {
                        keyboard: [
                            ['Вывести средства'],
                            ['Отмена']
                        ],
                        resize_keyboard: true
                    }
                })}
        })
    });
});
bot.hears('Курс валюты', (ctx) => {
    needle.get(`https://bankiros.ru/crypto/bitcoin-rub`, function (err, res) {

        if (err) throw err;
        var $ = cheerio.load(res.body);

        const rub = $('.crypto_curr_val').text();

        needle.get(`https://bankiros.ru/crypto/bitcoin-usd`, function (err, res) {

            if (err) throw err;
            var $ = cheerio.load(res.body);

            var d=new Date();
            var day=d.getDate();
            var month=d.getMonth() + 1;
            var year=d.getFullYear();

            const usd = $('.crypto_curr_val').text().split('.')[0].replace(/\D+/g,"");
            const markdown = `
📊 Курс валют в режиме реального времени:
*${day + "." + month + "." + year}*

*1BTC* = \`${rub.replace(/[^0-9]/g, '')}\`*₽*
*1BTC* = \`${usd}\`*$*    
   
    
    `;
            ctx.reply(markdown, {
                parse_mode: 'Markdown'
            })
        });
    });
});
bot.hears('Заработать', (ctx) => {

    needle.get(`https://bankiros.ru/crypto/bitcoin-rub`, function (err, res) {

        if (err) throw err;
        var $ = cheerio.load(res.body);

        const rub = $('.crypto_curr_val').text();

        needle.get(`https://bankiros.ru/crypto/bitcoin-usd`, function (err, res) {

            if (err) throw err;
            var $ = cheerio.load(res.body);

            const bonus = rub.replace(/[^0-9]/g, '') * 0.00000092;
            const html = `
Мы предлагаем вам заработать BTC за привлечение новых участников

Для этого мы выделили Вам реферальную ссылку: 

http://t.me/Zainsk_chatbot?start=${ctx.message.chat.id}

За каждого привлеченного участника вы будите получать:

0.00000092<b>BTC</b> = ${bonus.toFixed(2)}<b>₽</b>
             
    `;
            ctx.reply(html, {
                parse_mode: 'HTML'
            })
        });
    });
});
bot.hears('Войти', (ctx) => {
    ctx.scene.enter('subscription');
});
bot.hears('⚠️Информация', (ctx) => {
    const markdown = `
⚠ Эта группа подойдет тем кто ищет себе постоянного секс партнера или просто на одну ночь, для тех кто любит обмениваться  интим фото и видео. У нас присутствуют любители вирта, а так же  любители других форм сексуальных отношений.

*Желаем вам приятного общения*.
`;

    ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown'
    });
});
bot.hears('➕Подписка', (ctx) => {
    const markdown = `
   [🔐](http://img.ipev.ru/2018/04/26/11.jpg) *Для регистрации оформите одну из следующих подписок:*
        
\`После оформление подписки нажмите на кнопку\` «*Проверить оплату*», \`что бы завершить регистрацию.\`
    `;
    ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '1 месяц — 199 ₽',
                        url: 'https://bit.ly/2kMhfWq'
                    }
                ],
                [
                    {
                        text: '2 месяца — 299 ₽',
                        callback_data: 'Временно недоступно!'
                    }
                ],
                [
                    {
                        text: '3 месяца — 399 ₽',
                        url: 'https://bit.ly/2xU8YZW'
                    }
                ],
                [
                    {
                        text: 'Пробный период — 7 дней: 99 ₽',
                        url: 'https://bit.ly/2VHl8gq'
                    }
                ],
                [
                    {
                        text: 'Проверить оплату',
                        callback_data: '1'
                    }
                ]
            ]
        },
    });
});
bot.hears('Назад', (ctx) => {
    ctx.reply('...', {
        reply_markup: {
            keyboard: [
                ['Личный кабинет'],
                ['Курс валюты']
            ],
            resize_keyboard:true
        }
    });
});
bot.hears('Отмена', (ctx) => {
    ctx.reply('...', {
        reply_markup: {
            keyboard: [
                ['Личный кабинет'],
                ['Курс валюты']
            ],
            resize_keyboard:true
        }
    });
});
bot.hears('Депозит', (ctx) => {

        const user = ctx.message.chat.id;

        lk.findOne({'user_id': user },function(err, doc) {
            if(doc.key === 0) {
                const markdown = `
💳 *Ваш депозит*       

${doc.deposit}
    
        `;
                ctx.reply(markdown,{
                    parse_mode:'Markdown',
                    reply_markup: {
                        keyboard: [
                            ['Условия депозита'],
                            ['Пополнить', 'Вывести'],
                            ['Назад']
                        ],
                        resize_keyboard: true
                    }
                })
            }
            else if(doc.key !== 0){
                const markdown = `
💳 *Ваш депозит*       

${doc.deposit}
    
        `;
                ctx.reply(markdown,{
                    parse_mode:'Markdown',
                    reply_markup: {
                        keyboard: [
                            ['Условия депозита'],
                            ['Вывести'],
                            ['Назад']
                        ],
                        resize_keyboard: true
                    }
                })
            }
        });
});
bot.hears('Условия депозита', (ctx) => {
    needle.get(`https://bankiros.ru/crypto/bitcoin-rub`, function (err, res) {
        if (err) throw err;
        var $ = cheerio.load(res.body);
        const rub = $('.crypto_curr_val').text();

        const convert = rub.replace(/[^0-9]/g, '') * 0.00014964;

        const markdown = `
💳 Помимо заработка BTC путем привлечения новых участников, вам так же доступен депозит под различные процентные ставки:

*на 7 Дней под 15%
на 15 дней под 30%
на 30 дней под 50%*

Пополнить депозит Вы можете как отдельно так и со счета за привлеченных участников.
 
⚠️*Важно*:
▪️Возможно открыть только один депозит
▪️При досрочном выведение средств с депозита, сумма вклада не измениться
▪️Нельзя пополнять депозит 
▪️Минимальная сумма для пополнения депозита:
0.00014964 *BTC* = ${convert.toFixed()}*₽*
    `;
        ctx.reply(markdown, {
            parse_mode: 'Markdown',
        });
    })
});
bot.hears('Вывести', (ctx) => {

    const user = ctx.message.chat.id;
    lk.findOne({'user_id': user },function(err, doc) {
        if(doc.pass === 0) {
            const markdown = `
❌ *У Вас нет активного депозита* 
    `;
            ctx.reply(markdown, {
                parse_mode: 'Markdown',
            });
        }
        else if(doc.pass === 1) {
            ctx.scene.enter('deposit');
        }
    });
});
bot.hears('👍🏻Like', stepHandler, (ctx) => {

    like.findById('5c5848083fcd5f1d44926101' ,function(err, doc) {
        const markdown = `
 *Дайте оценку нашему сервису!*    
        `;
        ctx.reply(markdown,{
            parse_mode:'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: `👍🏻 ${doc.like1}`,
                            callback_data: 'one'
                        },
                        {
                            text: `👎🏻 ${doc.like2}`,
                            callback_data: 'two'
                        }
                    ],
                ]
            }
        })
    });

});

bot.on('inline_query', (ctx) => {

    const query = ctx.update.inline_query.query;
    const offset = ctx.inlineQuery.offset || 0;




if(query == 'sex'){categories(sex)}

function categories(code) {
    const results = [];
    code.find({}, function (err, doc) {
        var name = doc.map(elem => elem.name);
        var years = doc.map(elem => elem.years);
        var pictures = doc.map(elem => elem.pictures);
        var info = doc.map(elem => elem.info);
        for (let sok = 0; sok < name.length; sok++) {

            results.push({
                type: 'article',
                id: sok.toString(),
                title: `${name[sok]}, ${years[sok]}лет`,
                thumb_url: `${pictures[sok]}`,
                description: `${info[sok]}`,
                input_message_content: {
                    message_text: `

[🔞](${pictures[sok]})
\`Имя:\` *${name[sok]}*
\`Возраст:\` *${years[sok]}*
\`Интересы:\` *${info[sok]}*
`,
                    parse_mode: 'Markdown',
                },
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `↩️Продолжить поиск девушки`,
                                switch_inline_query_current_chat: `${query}`
                            }
                        ],
                        [
                            {
                                text: '🔞Познакомиться',
                                callback_data: 'acquainted'
                            }
                        ]
                    ],
                }
            });
        }
        ctx.answerInlineQuery(results.slice(+offset, +offset + 10),  {
            cache_time: 0,
            next_offset: +offset + 10,
            switch_pm_text: `Девушки`,
            switch_pm_parameter: '1234'
        })
    })
}
console.log(ctx.update)
});
bot.on('callback_query', ctx => {

    const s = ctx.update.callback_query.from.id;
    const query = ctx.callbackQuery.data;
    const id = 549073144;
    const chat = ctx.update.callback_query.inline_message_id;

    if (query === 'acquainted') {
        const markdown = `
🔐 \`Что бы отправить личное сообщение вы должны войти в систему!\`     
        `;
        bot.telegram.sendMessage(s, markdown,{
            parse_mode: 'Markdown',
            reply_markup:{
                keyboard:[
                    ['Войти'],
                    ['Отмена']
                    ],
                resize_keyboard: true
            }
        })
    }
    else if (query === '1') {
        ctx.telegram.answerCbQuery(ctx.callbackQuery.id, 'Платеж не найден!')
    }
    else if (query === 'one') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const id = chatId;

        const user = like({name: id });

        like.findOne({'name': id },function(err, doc) {

            if(doc != null)
            {
                if(doc.name == id) {
                    ctx.answerCbQuery('Вы уже голосовали')
                }else {
                    ctx.reply('окей');
                }

                console.log(doc.name)
            }
            else if (doc == null) {
                user.save((err, user) => {
                    console.log('good', user)
                });
                like.findById('5c5848083fcd5f1d44926101' ,function(err, docs) {
                    like.updateOne({'like1': docs.like1}, {'like1': ++docs.like1},function(err, doc) {
                        ctx.editMessageText( `
*Дайте оценку нашему сервису!*

\`Спасибо за голос!\``,{
                            parse_mode: 'Markdown',
                            chat_id: chatId,
                            message_id: messageId,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: `👍🏻 ${docs.like1}`,
                                            callback_data: 'on'
                                        },
                                        {
                                            text: `👎🏻 ${docs.like2}`,
                                            callback_data: 'on'
                                        }
                                    ],
                                ]
                            }
                        });
                    });
                });
            }
        });



    }
    else if (query === 'two') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const id = chatId;

        const user = like({name: id });

        like.findOne({'name': id },function(err, doc) {

            if(doc != null)
            {
                if(doc.name == id) {
                    ctx.answerCbQuery('Вы уже голосовали')
                }else {
                    ctx.reply('окей');
                }

                console.log(doc.name)
            }
            else if (doc == null) {
                user.save((err, user) => {
                    console.log('good', user)
                });
                like.findById('5c5848083fcd5f1d44926101' ,function(err, docs) {
                    like.updateOne({'like2': docs.like2}, {'like2': ++docs.like2},function(err, doc) {
                        ctx.editMessageText( `
*Дайте оценку нашему сервису!*

\`Спасибо за голос!\``,{
                            parse_mode: 'Markdown',
                            chat_id: chatId,
                            message_id: messageId,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: `👍🏻 ${docs.like1}`,
                                            callback_data: 'on'
                                        },
                                        {
                                            text: `👎🏻 ${docs.like2}`,
                                            callback_data: 'on'
                                        }
                                    ],
                                ]
                            }
                        });
                        console.log('no', doc.like)
                    });
                });
            }
        });



    }
    else if(query === 'on') {

        ctx.answerCbQuery('Вы уже голосовали')
    }
    else{
        ctx.telegram.answerCbQuery(ctx.callbackQuery.id, 'Временно недоступно!')
    }
});

bot.startPolling();
