const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

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
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    }
    catch (err) {
      message.channel.send("no such command");
    }
  }
});

//client.login(process.env.TOKEN)
