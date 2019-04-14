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
const sex = require('./section/sex');
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

const bot = new Telegraf('828821115:AAHFbXtllii6IElh9Hmkga_jBOygmyHnoiA');
const stage = new Stage();

stage.register(addChannel, addsaveChannel, restriction, subscription, help);
bot.use(session());
bot.use(stage.middleware());
bot.hears('📣Help', (ctx) => {
    ctx.scene.enter('help');
});
bot.command('start', (ctx) => {

    const markdown = `
*Hello*    
    `;

    ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                ['🔞Познакомиться', 'Войти'],
                ['⚠️Информация', '➕Подписка'],
                ['📣Help', '👍🏻Like']
            ],
            resize_keyboard: true
        },
        disable_notification: false
    });
});
bot.hears('🔞Познакомиться', (ctx) => {
    const markdown = `
🔞 *Тут Вы можете найти себе партнера, для любых интим целей.* 
    `;
    ctx.reply(markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Найти',
                        switch_inline_query_current_chat: 'sex'
                    }
                    ]
                ]
        }
        })
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
bot.hears('Отмена', (ctx) => {
    const markdown = `
*...*    
    `;

    ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                ['🔞Познакомиться', 'Войти'],
                ['⚠️Информация', '➕Подписка'],
                ['📣Help', '👍🏻Like']
            ],
            resize_keyboard: true
        },
        disable_notification: false
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
