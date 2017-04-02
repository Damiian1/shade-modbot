exports.run = (client, message, args, Discord, sql) => {
var react = require("../eos.js")
var guild = message.guild

  if (args[0] == "create") {
    var commandname = args[1]
    if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()}
    sql.get(`SELECT * FROM tags WHERE commandname ='${commandname}'`).then(row => {
       if (!row) {
         sql.run('INSERT INTO tags (commandname, action) VALUES (?, ?)', [commandname, args.slice(2).join(" ")]);
         message.channel.sendMessage(`Eos \`Success\` - Command ${commandname} created!`)
             .then(message=>message.react('✅'))
       } else {
         message.channel.sendMessage("Eos \`Error`\ - That command already exists!")
             .then(message=>message.react('❎'));
       }
     }).catch((err) => {
       console.error(err);
       sql.run('CREATE TABLE IF NOT EXISTS tags (commandname TEXT, action TEXT)').then(() => {
         sql.run('INSERT INTO tags (commandname, action) VALUES (?, ?)', [commandname, args.slice(2).join(" ")]);

         message.channel.sendMessage(`Eos \`Success\` - Command ${commandname} created!`)
             .then(message=>message.react('✅'))
       });
     });

  }else if (args[0] == "delete") {
    if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()}
    var commandname = args[1]
    sql.get(`SELECT * FROM tags WHERE commandname = '${commandname}'`).then(row =>{
      if (!row){
        message.channel.sendMessage("Eos \`Error`\ - That command does not exist!")
          .then(message=>message.react('❎'))
<<<<<<< HEAD
=======
          return;
>>>>>>> da2b3278c235bee3943c64e9c14f626fbded8b96
      }
      sql.run(`DELETE FROM tags WHERE commandname = "${row.commandname}"`)})
      message.channel.sendMessage(`Eos \`Success\` - Command ${commandname} deleted`)
          .then(message=>message.react('✅'))

    .catch((err) => {
      console.error(err)
      message.channel.sendMessage("Error - Something happened but I'm too lazy to put a command thing cos the rest isn't even finished yet.")})

  }else{
    var commandname = args[0]
    sql.get(`SELECT * FROM tags WHERE commandname = '${commandname}'`).then(row =>{
      if (!row) return message.channel.sendMessage("Eos \`Error`\ - That command does not exist!")
          .then(message=>message.react('❎'));
      message.channel.sendMessage(`Tag \`${commandname}\` - ${row.action}`)
    }).catch((err) => {
      console.error(err)
      message.channel.sendMessage("Error - Something happened but I'm too lazy to put a command thing cos the rest isn't even finished yet.")
    });
  }
}
