const Discord = require("discord.js")
const config = require("../config.json")
const days = ['Sunday', 'Wednesday']

module.exports.run = (client, message, args) => {
  const now = new Date()
  const origin = new Date(1532242116705)
  let dateDiff = now.getTime()-origin.getTime()
  dateDiff = Math.round(dateDiff/(1000*3600*24))
  let weeks = Math.floor(dateDiff/3.5)
  let prizeOff = weeks % 3
  let bonusOff = weeks % 10
  let dayOff = weeks % 2
  let result = []
  for (var i = 0; i < 3; i++) {
    result.push([config.BonusList[(i+bonusOff)%10], config.PrizeList[(i+prizeOff)%3], days[(i+dayOff)%2]])
  }
  let embed = new Discord.RichEmbed()
    .setTitle("Upcoming Tournament Info")
  for (var i in result) {
    embed.addField(result[i][2],result[i][1]+" "+result[i][0])
  }
  message.channel.send(embed)
}
