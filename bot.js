const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.login(auth.token);

var isReady = true;
let timesInSwamp = 0;
let shrekHP = 1000000;
let userHP = 100;

//Shrek joins the channel and yells "What are you doing in my swamp?" then leaves
bot.on('message', msg => {
  if (isReady && msg.content === 'Shrek!') {
    isReady = false;
    msg.reply('WHAT ARE YOU DOING IN MY SWAMP?');
    timesInSwamp++;

    var voiceChannel = msg.member.voiceChannel;
    voiceChannel.join().then(connection =>{
        const dispatcher = connection.playFile('./swamp.mp3');
        dispatcher.on("end", end => {
            voiceChannel.leave();
        })
    }).catch(err => console.log(err))
    isReady = true;
}
    

    else if (isReady && msg.content === "How many times have I intruded Shrek's privacy?"){
        isReady = false;
        msg.reply(timesInSwamp + " NUMBER OF TIMES!")
        console.log(timesInSwamp);
        isReady = true;
    }
        

    else if (isReady && msg.content === 'Somebody') {
        isReady = false;

     var voiceChannel = msg.member.voiceChannel;
     voiceChannel.join().then(connection =>{
        const dispatcher = connection.playFile('./allstar.mp3');
        dispatcher.on("end", end => {
            voiceChannel.leave();
        })
        })
    isReady = true;
    }

    else if (isReady && msg.content === 'DIE OGRE') {
        isReady = false;
        msg.channel.send("ROARRRRRRRRRRRRR");

        var voiceChannel = msg.member.voiceChannel;
        voiceChannel.join().then(connection =>{
            const dispatcher = connection.playFile('./roar.mp3');
            dispatcher.on("end", end => {
                 voiceChannel.leave();
             })
            })
        if (userHP > 0){
            userHP -= Math.floor(1 + Math.random() * 10);
            if (userHP < 0){
                userHP = 0;
            }
            msg.reply(" your health is now " + userHP + "!");
        }
        
        if (shrekHP > 0){
             shrekHP -= 1
             msg.channel.send("My health is " + shrekHP + "!");
         }
         else{
            msg.channel.send("I am already dead...");
         }

         if (userHP === 0){
            msg.channel.send("HA! You died!");
         }
        isReady = true;
    }

    else if (isReady && msg.content === 'I am Princess Fiona') {
        isReady = false;
        msg.channel.send("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");

         var voiceChannel = msg.member.voiceChannel;
        voiceChannel.join().then(connection =>{
            const dispatcher = connection.playFile('./noo.mp3');
            dispatcher.on("end", end => {
                 voiceChannel.leave();
             })
            })

        shrekHP = 0

        msg.channel.send("My health is " + shrekHP + "!");
        msg.reply(" you have bested me...");

        isReady = true;
    }

    else if (isReady && msg.content === 'DONKEY IS HERE') {
        isReady = false;

        if (shrekHP === 0){
            msg.channel.send("I LIVE AGAIN!");
            shrekHP = 100;
            msg.channel.send("My health is " + shrekHP + "!");
        }

        else {
            msg.channel.send("YOU'RE NOT DONKEY!")
            userHP = 1
            msg.reply(" your health is now " + userHP + "!");
        }
        
        isReady = true;
    }
   })

