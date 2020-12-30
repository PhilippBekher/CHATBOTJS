require('dotenv').config()

const { Telegraf } = require('telegraf')
const api = require('covid19-api')
const Markup = require('telegraf/markup')
const bot = new Telegraf(process.env.bot_token)
bot.start((ctx) => ctx.reply(`Let's play a game, MR.${ctx.message.from.first_name}`, Markup.keyboard([['US','Russia'],['Ukraine','Kazakhstan']]
).resize()
.extra()

))
// bot.on('text', function play (ctx){
//     if(ctx.message.text тип не номер){
//         ctx.reply('Enter a number bro')
//     } else {
//         first number = ctx.message.text
//         ctx.reply('Enter the second number')
//     }
// })
// bot.on('text',function Second (ctx){
//     if ()
// })
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.on('text', async (ctx) => {
    let data = {}
  try{
    data = await api.getReportsByCountries(ctx.message.text)
    let formaData = `
    Country ${data[0][0].country}
    Cases ${data[0][0].cases}
    Deaths ${data[0][0].deaths}
    Recovered ${data[0][0].recovered}`;
    ctx.reply(formaData)
  } catch{
      console.log('Error')
      ctx.reply('Error, such country does not exist')
  }

})

bot.hears('hello', (ctx) => ctx.reply('Hey there'))
bot.launch()