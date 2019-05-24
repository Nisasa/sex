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


const BlockIo = require('block_io');
const version = 2; // API version
const block_io = new BlockIo('7e68-a9ff-59a4-e18d', '88993421jkjok', version);

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
🌐 *Support*:

\`Если имеются какие либо проблемы, пишем сюда:\`
`
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['❌Отмена']
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
        const forward = 549073144;
        const txt = ctx.message.text;

        if (txt === '❌Отмена') {
            if(id === admin){
                ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                    reply_markup: {
                        keyboard: [
                            ['🖥Личный кабинет'],
                            ['👍🏻Like', '💰Donate'],
                            ['❓Информация', '🌐Support']
                        ],
                        resize_keyboard: true
                    },
                });
                return ctx.scene.leave()
            }else {
                ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                    reply_markup: {
                        keyboard: [
                            ['🖥Личный кабинет'],
                            ['👍🏻Like', '💰Donate'],
                            ['❓Информация', '🌐Support']
                        ],
                        resize_keyboard: true
                    },
                });
                return ctx.scene.leave();
            }
        }else{
            const html1 = `
🌐 <b>Сообщение было успешно отправлено</b> ✔️

<code>В скором времени с вами свяжется тех поддержка.</code>`;
            ctx.telegram.sendMessage(ctx.message.chat.id, html1,{
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['🖥Личный кабинет'],
                        ['👍🏻Like', '💰Donate'],
                        ['❓Информация', '🌐Support']
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

const one = new WizardScene('one',

    stepHandler,
    (ctx) => {
        const markdown = `
💳*Выберите период подписки*:

▪️\`Один день\`  -  790*₽*
▫️\`Три дня\`  -  2090*₽*
▪️\`Неделя\`  -  4090*₽*
▫️\`Месяц\`  -  8090*₽*

Оплата производиться в *Bitcoins*(биткоинах)

⚠️\`Для постоянных клиентов сумма для каждой подписки будет снижена на\` *15%*
⚠️\`Мы не возвращаем деньги за уже оплаченную подписку\`.
    `;
        ctx.reply(markdown, {
            parse_mode:'Markdown',
            reply_markup:{
                keyboard:[
                    ['Один день', 'Три дня'],
                    ['Неделя', 'Месяц'],
                    ['❌Отмена']
                ],
                resize_keyboard: true
            }

        });
        ctx.session.counter = ctx.message.text;
        return ctx.wizard.next()
    },
    (ctx) => {
        const txt = ctx.message.text;

        if (txt === 'Один день'){
            const user = ctx.message.chat.id;
            lk.findOne({'user_id': user },function(err, doc) {
                if(doc.pass === '0') {
                    block_io.get_new_address({'label': user}, function(err, suk) {
                        const markdown = `
💳 *Оплата*

Вами сформирована заявка на подписку «*${txt}*», для завершения операции оплатите счет 790*₽*.

💳*Адрес Bitcoin счета для оплаты*:
 \`${suk.data.address}\`

⚠️На оплату счета отведено *48 часов*, после заявка на подписку будет аннулирована.   
        `;
                        ctx.reply(markdown,{
                            parse_mode:'Markdown',
                            reply_markup: {
                                keyboard: [
                                    ['🖥Личный кабинет'],
                                    ['👍🏻Like', '💰Donate'],
                                    ['❓Информация', '🌐Support']
                                ],
                                resize_keyboard: true
                            }
                        });
                        lk.updateOne({'user_id': user},
                            { $set: {'pass': suk.data.address, 'key': 1, 'deposit': txt, 'members': 790}},function  () {});

                        console.log(suk.data.address) });
                    return ctx.scene.leave()
                }
                else {
                    const markdown = `
💳 *Оплата*

Вами сформирована заявка на подписку «*${txt}*», для завершения операции оплатите счет 790*₽*.

💳*Адрес Bitcoin счета для оплаты*:
 \`${doc.pass}\`

⚠️На оплату счета отведено *48 часов*, после заявка на подписку будет аннулирована.   
        `;
                    ctx.reply(markdown, {
                        parse_mode: 'Markdown',
                        reply_markup: {
                            keyboard: [
                                ['🖥Личный кабинет'],
                                ['👍🏻Like', '💰Donate'],
                                ['❓Информация', '🌐Support']
                            ],
                            resize_keyboard: true
                        }
                    });
                    lk.updateOne({'user_id': user},
                        { $set: {'key': 1, 'deposit': txt, 'members': 790}},function  () {});
                    return ctx.scene.leave()
                }
            });
        }
        else if (txt === 'Три дня' ){
            const user = ctx.message.chat.id;
            lk.findOne({'user_id': user },function(err, doc) {
                if(doc.pass === '0') {
                    block_io.get_new_address({'label': user}, function(err, suk) {
                        const markdown = `
💳 *Оплата*

Вами сформирована заявка на подписку «*${txt}*», для завершения операции оплатите счет 2090*₽*.

💳*Адрес Bitcoin счета для оплаты*:
 \`${suk.data.address}\`

⚠️На оплату счета отведено *48 часов*, после заявка на подписку будет аннулирована.   
        `;
                        ctx.reply(markdown,{
                            parse_mode:'Markdown',
                            reply_markup: {
                                keyboard: [
                                    ['🖥Личный кабинет'],
                                    ['👍🏻Like', '💰Donate'],
                                    ['❓Информация', '🌐Support']
                                ],
                                resize_keyboard: true
                            }
                        });
                        lk.updateOne({'user_id': user},
                            { $set: {'pass': suk.data.address, 'key': 1, 'deposit': txt, 'members': 2090}},function  () {});

                        console.log(suk.data.address) });
                    return ctx.scene.leave()
                }
                else {
                    const markdown = `
💳 *Оплата*

Вами сформирована заявка на подписку «*${txt}*», для завершения операции оплатите счет 2090*₽*.

💳*Адрес Bitcoin счета для оплаты*:
 \`${doc.pass}\`

⚠️На оплату счета отведено *48 часов*, после заявка на подписку будет аннулирована.   
        `;
                    ctx.reply(markdown, {
                        parse_mode: 'Markdown',
                        reply_markup: {
                            keyboard: [
                                ['🖥Личный кабинет'],
                                ['👍🏻Like', '💰Donate'],
                                ['❓Информация', '🌐Support']
                            ],
                            resize_keyboard: true
                        }
                    });
                    lk.updateOne({'user_id': user},
                        { $set: {'key': 1, 'deposit': txt, 'members': 2090}},function  () {});
                    return ctx.scene.leave()
                }
            });
        }
        else if (txt === 'Неделя'){
            const user = ctx.message.chat.id;
            lk.findOne({'user_id': user },function(err, doc) {
                if(doc.pass === '0') {
                    block_io.get_new_address({'label': user}, function(err, suk) {
                        const markdown = `
💳 *Оплата*

Вами сформирована заявка на подписку «*${txt}*», для завершения операции оплатите счет 4090*₽*.

💳*Адрес Bitcoin счета для оплаты*:
 \`${suk.data.address}\`

⚠️На оплату счета отведено *48 часов*, после заявка на подписку будет аннулирована.   
        `;
                        ctx.reply(markdown,{
                            parse_mode:'Markdown',
                            reply_markup: {
                                keyboard: [
                                    ['🖥Личный кабинет'],
                                    ['👍🏻Like', '💰Donate'],
                                    ['❓Информация', '🌐Support']
                                ],
                                resize_keyboard: true
                            }
                        });
                        lk.updateOne({'user_id': user},
                            { $set: {'pass': suk.data.address, 'key': 1, 'deposit': txt, 'members': 4090}},function  () {});

                        console.log(suk.data.address) });
                    return ctx.scene.leave()
                }
                else {
                    const markdown = `
💳 *Оплата*

Вами сформирована заявка на подписку «*${txt}*», для завершения операции оплатите счет 4090*₽*.

💳*Адрес Bitcoin счета для оплаты*:
 \`${doc.pass}\`

⚠️На оплату счета отведено *48 часов*, после заявка на подписку будет аннулирована.   
        `;
                    ctx.reply(markdown, {
                        parse_mode: 'Markdown',
                        reply_markup: {
                            keyboard: [
                                ['🖥Личный кабинет'],
                                ['👍🏻Like', '💰Donate'],
                                ['❓Информация', '🌐Support']
                            ],
                            resize_keyboard: true
                        }
                    });
                    lk.updateOne({'user_id': user},
                        { $set: {'key': 1, 'deposit': txt, 'members': 4090}},function  () {});
                    return ctx.scene.leave()
                }
            });
        }
        else if (txt === 'Месяц'){
            const user = ctx.message.chat.id;
            lk.findOne({'user_id': user },function(err, doc) {
                if(doc.pass === '0') {
                    block_io.get_new_address({'label': user}, function(err, suk) {
                        const markdown = `
💳 *Оплата*

Вами сформирована заявка на подписку «*${txt}*», для завершения операции оплатите счет 8090*₽*.

💳*Адрес Bitcoin счета для оплаты*:
 \`${suk.data.address}\`

⚠️На оплату счета отведено *48 часов*, после заявка на подписку будет аннулирована.   
        `;
                        ctx.reply(markdown,{
                            parse_mode:'Markdown',
                            reply_markup: {
                                keyboard: [
                                    ['🖥Личный кабинет'],
                                    ['👍🏻Like', '💰Donate'],
                                    ['❓Информация', '🌐Support']
                                ],
                                resize_keyboard: true
                            }
                        });
                        lk.updateOne({'user_id': user},
                            { $set: {'pass': suk.data.address, 'key': 1, 'deposit': txt, 'members': 8090}},function  () {});

                        console.log(suk.data.address) });
                    return ctx.scene.leave()
                }
                else {
                    const markdown = `
💳 *Оплата*

Вами сформирована заявка на подписку «*${txt}*», для завершения операции оплатите счет 8090*₽*.

💳*Адрес Bitcoin счета для оплаты*:
 \`${doc.pass}\`

⚠️На оплату счета отведено *48 часов*, после заявка на подписку будет аннулирована.   
        `;
                    ctx.reply(markdown, {
                        parse_mode: 'Markdown',
                        reply_markup: {
                            keyboard: [
                                ['🖥Личный кабинет'],
                                ['👍🏻Like', '💰Donate'],
                                ['❓Информация', '🌐Support']
                            ],
                            resize_keyboard: true
                        }
                    });
                    lk.updateOne({'user_id': user},
                        { $set: {'key': 1, 'deposit': txt, 'members': 8090}},function  () {});
                    return ctx.scene.leave()
                }
            });
        }
        else if(txt === '❌Отмена' || txt === '/start') {
            ctx.reply('...', {
                reply_markup: {
                    keyboard: [
                        ['🖥Личный кабинет'],
                        ['👍🏻Like', '💰Donate'],
                        ['❓Информация', '🌐Support']
                    ],
                    resize_keyboard:true
                }
            });
            return ctx.scene.leave()
        }

    },
);

const bot = new Telegraf('844122718:AAFR2ADSV2O6O7YZw_nA4TQGyrZdYh0pdf4');
const stage = new Stage();

stage.register(addChannel, addsaveChannel, help, one);
bot.use(session());
bot.use(stage.middleware());
bot.hears('🌐Support', (ctx) => {
    ctx.scene.enter('help');
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

                ctx.reply(`⬇️ Для работы с ботом воспользуйтесь меню!`, {
                    parse_mode: 'Markdown',
                    reply_markup: {
                        keyboard: [
                            ['🖥Личный кабинет'],
                            ['👍🏻Like', '💰Donate'],
                            ['❓Информация', '🌐Support']
                        ],
                        resize_keyboard:true
                    }
                });
            }
        }
        else if (doc == null) {
            user.save(() => {
                ctx.reply(`
Приветствуем Вас *${ctx.message.chat.first_name}*
⬇️ Для работы с ботом воспользуйтесь меню!`, {
                    parse_mode: 'Markdown',
                    reply_markup: {
                        keyboard: [
                            ['🖥Личный кабинет'],
                            ['👍🏻Like', '💰Donate'],
                            ['❓Информация', '🌐Support']
                        ],
                        resize_keyboard:true
                    }
                });
            })

        }
    });
});
bot.hears('Пополнить', (ctx) => {
    const user = ctx.message.chat.id;
    lk.findOne({'user_id': user },function(err, doc) {
        if(doc.key === 0) {
            ctx.scene.enter('one');
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

bot.hears('Войти', (ctx) => {
    ctx.scene.enter('subscription');
});
bot.hears('💰Donate', (ctx) => {
    const markdown = `
💰*Для тех кто хочет выразить свою финансовую благодарность за наши услуги*:

💳*Адрес Bitcoin счета для доната*:
 \`3GX32so51imDZiKQDDcv8d9XDJYdvtNdFF\`
`;

    ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown'
    });
});
bot.hears('❓Информация', (ctx) => {
    const markdown = `
✅ *Кто и что это?*

Мы предоставляем прогнозы на спорт из раздела *Футбол*.
Специализируемся мы лишь на ставках *исход матча*, связано это с тем что это самый востребованный и актуальный тип ставок.

Наши прогнозы это прирост *90* - *120*% к вашему банку.
Так же наши прогнозы не являются "*кнопкой бабло*" и мы не владеем информацией о *договорных матчах*. Мы лишь проводим свою аналитику и зарабатываем на этом.
`;

    ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Подробнее',
                        callback_data: 'what'
                    }
                ],
            ]
        }
    });
});
bot.hears('✅Подписаться', (ctx) => {
    const user = ctx.message.chat.id;
    lk.findOne({'user_id': user },function(err, doc) {
        if(doc.key === 0) {
            ctx.scene.enter('one');
        }
    });
});

bot.hears('Назад', (ctx) => {
    ctx.reply('...', {
        reply_markup: {
            keyboard: [
                ['🖥Личный кабинет'],
                ['👍🏻Like', '💰Donate'],
                ['❓Информация', '🌐Support']
            ],
            resize_keyboard:true
        }
    });
});
bot.hears('Отмена', (ctx) => {
    ctx.reply('...', {
        reply_markup: {
            keyboard: [
                ['🖥Личный кабинет'],
                ['👍🏻Like', '💰Donate'],
                ['❓Информация', '🌐Support']
            ],
            resize_keyboard:true
        }
    });
});
bot.hears('❌Отмена', (ctx) => {
    ctx.reply('...', {
        reply_markup: {
            keyboard: [
                ['🖥Личный кабинет'],
                ['👍🏻Like', '💰Donate'],
                ['❓Информация', '🌐Support']
            ],
            resize_keyboard:true
        }
    });
});

bot.hears('5', (ctx) => {
    const user = ctx.message.chat.id;
    lk.findOne({'user_id': user },function(err, doc) {
        if(doc.pass === '0') {
            block_io.get_new_address({'label': user}, function(err, suk) {

                ctx.reply('Yes');

                lk.updateOne({'user_id': user},
                    { $set: {'pass': suk.data.address}},function  () {});

                console.log(suk.data.address) })
        }
        else{ctx.reply(doc.pass)}
    });
});

bot.hears('🖥Личный кабинет', (ctx) => {

    const user = ctx.message.chat.id;

    lk.findOne({'user_id': user },function(err, doc) {
        if(doc.key === 0) {
            const markdown = `
🖥 *Личный кабинет*      
        
▪️ *Активные подписки*: 
\`${doc.deposit}\`

▪️ *Всего использованных подписок*:
 *0* шт.

▪️ *Активные скидки*:
 *15*% - отсутствует           
        `;
            ctx.reply(markdown,{
                parse_mode:'Markdown',
                reply_markup: {
                    keyboard: [
                        ['✅Подписаться'],
                        ['Назад']
                    ],
                    resize_keyboard: true
                }
            })
        }
        else if(doc.key !== 0){
            const markdown = `
🖥 *Личный кабинет*      
        
▪️ *Активные подписки*:
🔄 Подписка «*${doc.deposit}*» в процессе обработки, ожидается оплата ${doc.members}*₽*

💳 Адрес *Bitcoin* счета для оплаты:
 \`${doc.pass}\`

▪️ *Всего использованных подписок*:
 *0* шт.

▪️ *Активные скидки*:
 *15*% - отсутствует
        `;
            ctx.reply(markdown,{
                parse_mode:'Markdown',
                reply_markup: {
                    keyboard: [
                        ['Назад']
                    ],
                    resize_keyboard: true
                }
            })
        }
    });
});
bot.hears('👍🏻Like', stepHandler, (ctx) => {

    like.findById('685848083fcd5f1d4492610d' ,function(err, doc) {
        const markdown = `
✔️ *Дайте честную оценку нашему сервису*!    
        `;
        ctx.reply(markdown,{
            parse_mode:'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: `➕ ${doc.like1}`,
                            callback_data: 'one'
                        },
                        {
                            text: `➖ ${doc.like2}`,
                            callback_data: 'two'
                        }
                    ],
                ]
            }
        })
    });

});

bot.on('message', ctx => {

    const id = ctx.message.chat.id;
    const admin = 549073144;

    const forward = ctx.message.reply_to_message;

    if (forward && id === admin) {
        const text1 = ctx.message.reply_to_message.text;
        const text = ctx.message.text;
        const markdown =`
🌐 *Ответ на ваш вопрос*:

"\`${text1}\`"

▪️ ${text}
`;

        const id = ctx.message.reply_to_message.forward_from.id;

        ctx.telegram.sendMessage(ctx.message.chat.id=`${id}`, markdown,{
            parse_mode: 'Markdown'
        });
        console.log(ctx.message.reply_to_message.text)
    }
    else{ctx.reply(`⬇️ Для работы с ботом воспользуйтесь меню!`, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                ['🖥Личный кабинет'],
                ['👍🏻Like', '💰Donate'],
                ['❓Информация', '🌐Support']
            ],
            resize_keyboard:true
        }
    })

    }
    console.log(ctx.message)

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
    else if (query === 'what') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;

        const markdown = `
✅ *Что Вы получаете подписавшись на наши прогнозы?*

▪️в сутки за *3* - *4* часа до начала матча Вы будете получать от *2* до *4* прогнозов
▫️КФ ставки будет составлять не менее *1*.*9*
▪️по окончанию подписки окончательная прибыль к вашему банку составит *90* - *120*% 

⚠️\`Активация подписки доступна в личном кабинете.\`
        `;
                        ctx.editMessageText(markdown,{
                            parse_mode: 'Markdown',
                            chat_id: chatId,
                            message_id: messageId,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: 'Узнать стоимость?',
                                            callback_data: 'what money'
                                        }
                                    ],
                                ]
                            }
                        });
    }
    else if (query === 'what money') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;

        const markdown = `
✅ *Мы предоставляем подписку на разные период времени*:

▪️\`Один день\`  -  790*₽*
▫️\`Три дня\`  -  2090*₽*
▪️\`Неделя\`  -  4090*₽*
▫️\`Месяц\`  -  8090*₽*

Оплата производиться в *Bitcoins*(биткоинах)

⚠️\`Для постоянных клиентов сумма для каждой подписки будет снижена на\` *15%*
⚠️\`Мы не возвращаем деньги за уже оплаченную подписку\`.
⚠️\`Активация подписки доступна в личном кабинете\`.
        `;
        ctx.editMessageText(markdown,{
            parse_mode: 'Markdown',
            chat_id: chatId,
            message_id: messageId
        });
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
                like.findById('685848083fcd5f1d4492610d' ,function(err, docs) {
                    like.updateOne({'like1': docs.like1}, {'like1': ++docs.like1},function(err, doc) {
                        ctx.editMessageText( `
✔️ *Дайте честную оценку нашему сервису*!

\`Спасибо за оценку!\``,{
                            parse_mode: 'Markdown',
                            chat_id: id,
                            message_id: messageId,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: `➕ ${docs.like1}`,
                                            callback_data: 'on'
                                        },
                                        {
                                            text: `➖ ${docs.like2}`,
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
                like.findById('685848083fcd5f1d4492610d' ,function(err, docs) {
                    like.updateOne({'like2': docs.like2}, {'like2': ++docs.like2},function(err, doc) {
                        ctx.editMessageText( `
✔️ *Дайте честную оценку нашему сервису*!

\`Спасибо за оценку!\``,{
                            parse_mode: 'Markdown',
                            chat_id: chatId,
                            message_id: messageId,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: `➕ ${docs.like1}`,
                                            callback_data: 'on'
                                        },
                                        {
                                            text: `➖ ${docs.like2}`,
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
