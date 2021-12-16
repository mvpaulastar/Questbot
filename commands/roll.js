/* Still under construction. This is a very rudimentary version of the roll command.
import Math
module.exports = {
    name: 'roll',
    description: "Bot rolls the dice",
    execute(message, args, Quests, sequelize, Characters, Users ){
      // ?roll 1d6
      let dice = args[0].split("d");
      const numdice = dice[0];
      const typedice = dice[1];
      
      const result = numdice * Math.random()*typedice;
      
      message.channel.send('Result is ${result}!');
    }
}
*/
