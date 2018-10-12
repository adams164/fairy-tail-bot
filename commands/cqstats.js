const {google} = require('googleapis');
const token = require("../gtoken.json");
const config = require("../config.json");

var client_id
var client_secret
try{
  let tokens = require("../TOKEN.json")
  client_id = tokens.client_id
  client_secret = tokens.client_secret
}
catch (err) {
  client_id = process.env.CLIENT_ID
  client_secret = process.env.CLIENT_SECRET
}

function authorize(client_id, client_secret) {
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret);
  oAuth2Client.setCredentials(token);
  return oAuth2Client
}

const auth = authorize(client_id, client_secret)
const sheetService = google.sheets({version: 'v4', auth})

module.exports.run = (client, message, args) => {
  sheetService.spreadsheets.values.get({
      spreadsheetId: config.CQsheetId,
      range: config.dataRange,
    }, (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        var rawusername = args.join(" ")
        var username = rawusername.replace(/^\[FT\]/g,'').trim()
        var index = result.data.values.findIndex(function(element){
            return element[1] == username
          });
        const userStats = result.data.values[index]
        message.channel.send({embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "Stats for "+username,
          fields: [{
            name: "Username",
            value: username
          },
          {
            name: "Max Stage",
            value: userStats[3]
          },
          {
            name: "Attendance %",
            value: userStats[10]
          },
          {
            name: "Damage Contribution %",
            value: userStats[6]
          },
          {
            name: "Clan Requirement Status",
            value: userStats[13]
          }]
         }
        });
      }
    });
}
