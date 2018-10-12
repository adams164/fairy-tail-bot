const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
<<<<<<< HEAD
=======
const cqstats = require("./commands/cqstats.js");

var TOKEN;
try {
  let tokenFile = require("./TOKEN.json")
  TOKEN = tokenFile.token
} catch (err) {
  TOKEN = process.env.TOKEN
}
>>>>>>> dev-branch

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(config.prefix)) {
    //do something with normal messages
    return;
  }

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  const Exp = /^[0-9a-z]+$/
  if (command.match(Exp)) {
<<<<<<< HEAD
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    }
    catch (err) {
      message.channel.send("no such command");
=======
    if (command == "cqstats"){
      cqstats.run(client, message, args);
    }
    else {
      try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
      }
      catch (err) {
        console.log(err)
        message.channel.send("no such command");
      }
>>>>>>> dev-branch
    }
  }
});

<<<<<<< HEAD
//client.login(process.env.TOKEN)
=======
client.login(TOKEN)
>>>>>>> dev-branch
