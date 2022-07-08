const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');
const delay = require('delay');

const GoStumble = (ronde, auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/${ronde}', {
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {
  const token = rs.question(chalk.greenBright(`[+] Input you token : `));
  if (token == "1") {
    await delay(500);
    console.clear('');
    console.log(chalk.cyanBright(`
██╗  ██╗███████╗ ██████╗████████╗ ██████╗ ██████╗
██║  ██║██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
███████║█████╗  ██║        ██║   ██║   ██║██████╔╝
██╔══██║██╔══╝  ██║        ██║   ██║   ██║██╔══██╗
██║  ██║███████╗╚██████╗   ██║   ╚██████╔╝██║  ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
1. Crown
2. Trophy
      `));

     const pilih = rs.question(chalk.cyanBright(chalk.bold('1 or 2 -'));
     const auth = rs.question(chalk.cyanBright(chalk.bold('[+] Enter Auth Keys : '));
     const time = rs.question(chalk.cyanBright(chalk.bold('[+] Enter Delay Max 1000 : '));
     console.log('');

     if (pilih == 1) {
       while (true) {
         var ronde = "3";
         const result = await GoStumble(ronde, auth);
         if (!result) {
           console.log(chalk.redBright(`Auth Sudah Expired`));
         } else if (result.includes('User')) {
           const data = JSON.parse(result);
           const username = data.User.Username;
           const country = data.User.Country;
           const trophy = data.User.SkillRating;
           const crown = data.User.Crowns;

           console.log(chalk.cyanBright(chalk.bold(
             `\r[ ${moment().format('HH:mm')} ] ${chalk.cyanBright(
               `${country}`
             )} | ${username} | ${crown} | ${trophy}`
           );
           await delay(time)
         } else if (result == 'BANNED') {
           console.log(chalk.redBright(`Your Account Has Been Banned`));
           break;
         } else if (result == 'SERVER_ERROR') {
           continue;
         } else {
           continue;
         }
       }
     } else if (pilih == 2) {
       while (true) {
         var ronde = "2";
         const result = await GoStumble(ronde, auth);
         if (!result) {
           console.log(chalk.redBright(`Auth Sudah Expired`));
         } else if (result.includes('User')) {
           const data = JSON.parse(result);
           const username = data.User.Username;
           const country = data.User.Country;
           const trophy = data.User.SkillRating;

           console.log(chalk.cyanBright(chalk.bold(
             `\r[ ${moment().format('HH:mm')} ] ${chalk.cyanBright(
               `${country}`
             )} | ${username} | ${trophy}`
           );
           await delay(time)
         } else if (result == 'BANNED') {
           console.log(chalk.redBright(`Your Account Has Been Banned`));
           break;
         } else if (result == 'SERVER_ERROR') {
           continue;
         } else {
           continue;
         }
       }
     if (pilih == 1) {
       while (true) {
         var ronde = "3";
         const result = await GoStumble(ronde, auth);
         if (!result) {
           console.log(chalk.redBright(`Auth Sudah Expired`));
         } else if (result.includes('User')) {
           const data = JSON.parse(result);
           const username = data.User.Username;
           const country = data.User.Country;
           const trophy = data.User.SkillRating;
           const crown = data.User.Crowns;

           console.log(chalk.cyanBright(chalk.bold(
             `\r[ ${moment().format('HH:mm')} ] ${chalk.cyanBright(
               `${country}`
             )} | ${username} | ${crown} | ${trophy}`
           );
           await delay(time)
         } else if (result == 'BANNED') {
           console.log(chalk.redBright(`Your Account Has Been Banned`));
           break;
         } else if (result == 'SERVER_ERROR') {
           continue;
         } else {
           continue;
         }
       }
     }
   } else {
     console.log(chalk.redBright(`The token you entered is wrong`));
     break;
   }
})();
