exports.run = (client, message, args, Discord) => {
  //The ID for the guild (temp)
  let guild = message.guild
  //The ID for the muted role
  let mutedRole = guild.roles.find(role => role.name.toLowerCase() === "muted");
  //the user's mentionable
  let user = message.mentions.users.first()
  //The moderator's username
  let moderator = message.author.username
  // The log channel
  const tgtchannel = message.guild.channels.find('name', 'log-channel')

  if(!guild.member(message.author).hasPermission("MANAGE_MESSAGES")){
    message.reply("Eos \`Error`\ - You do not have permission to do that!")
      .then(message=>message.react('❎'));
    return;
  }

  //Removes the muted role and replaces it with the normal role (temp)
  guild.member(user).removeRole(mutedRole)
  guild.member(user).addRole("292955645513170944")

  //Notifies the user
  user.sendMessage(`Eos \`Info\` Dear user: You have been un-muted in \`${guild.name}\` by \`${moderator}\`. Welcome back.`)

  //Notifies the moderator
  message.channel.sendMessage("Eos \`Success`\ - User un-muted successfully.")
  .then(message=>message.react('✅'));

  //Sets up and sends the embed.
  const embed = new Discord.RichEmbed()
    .setAuthor(`Un-Muted:  ${user.username}`)
    .setColor(0x00AE86)
    .setTimestamp(message.createdAt)
    .addField("Un-Muted By: ", moderator, true)
    .setFooter("Automated Mod Logging");
  console.log(embed.fields)
  tgtchannel.sendEmbed(
  embed,
  {disableEveryone: true })
  }
