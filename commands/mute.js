exports.run = (client, message, args, Discord, sql) => {
  var react = require("../eos.js")
  var guild = message.guild
  var config = require("../config.json")

  //The ID for the muted role
  let mutedRole = guild.roles.find(role => role.name.toLowerCase() === "muted");
  //the user's mentionable
  let user = message.mentions.users.first()
  //The moderator's username
  let moderator = message.author.username
  // The log channel
  //const tgtchannel = message.guild.channels.find('name', 'log-channel')
  const ms = require("ms")
  const time = args[1]

  if(!user){return message.reply("Please mention a user.")}
  if(!time){return message.reply("Please specify a time.")}

  if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()};
  if (args.length >= 2){
  function addmute(){
    guild.member(user).addRole(mutedRole)
  }
  setTimeout(addmute, 500)
  //Notifies the user
  var muteMsg = require("../config.json")[guild.id].mute.message
  if(!muteMsg){
    user.send(`You were muted in ${guild.name} for ${time} by ${moderator}. Please do not break the rules again as further punishment may be dealt.`)
  }else{
    user.send(muteMsg)
  }
  //Notifies the moderator
  message.channel.send(`Eos \`Success\` - User muted for \`${ms(ms(time), {long: true})}.\`.`)
  .then(message=>message.react('✅'));

  setTimeout(function() {
    guild.member(user).removeRole(mutedRole)
  }, ms(time));

  //Sets up and sends the embed.
  const embed = new Discord.RichEmbed()
    .setAuthor(`Muted: ${user.username}`)
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("Muted By: ", moderator, true)
    .addField("Reason: ", args.slice(2).join(" "), true)
    .addField("Time: ", time, true)
    .setFooter("Automated Mod Logging");

    const logchannel = message.guild.channels.get(config[guild.id].logchannelID)
    logchannel.send({embed}).catch(console.log)

  }else{
    message.reply("Eos \`Error`\ - You must add a reason!")
    .then(message=>message.react('❎'));
  }
}
