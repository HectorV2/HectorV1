const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');
const delay = require('delay');

const GoStumble = (ronde, auth) => new Promise((resolve, reject) => {

fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
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
  const token = rs.question(chalk.redBright(`[+] Input you token : `));
  if (token == "1") {
    await delay(1000);
    console.clear('');
    console.log(chalk.blueBright(chalk.bold(`
██╗  ██╗███████╗ ██████╗████████╗ ██████╗ ██████╗
██║  ██║██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
███████║█████╗  ██║        ██║   ██║   ██║██████╔╝
██╔══██║██╔══╝  ██║        ██║   ██║   ██║██╔══██╗
██║  ██║███████╗╚██████╗   ██║   ╚██████╔╝██║  ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
1. Crown
2. Trophy
`)));

     const pilih = rs.question(chalk.blueBright(chalk.bold('[+] Choose 1 or 2 : ')));

     if (pilih == 1) {

     const auth = rs.question(chalk.blueBright(chalk.bold('[+] Enter Auth Code : ')));

       while (true) {

         var ronde = "3";
         const result = await GoStumble(ronde, auth);
         if (!result) {

           console.log(chalk.redBright(`Auth Sudah Expired`));
           break;

         } else if (result.includes('User')) {
           const data = JSON.parse(result);
           const username = data.User.Username;
           const country = data.User.Country;
           const id = data.User.Id;
           const region = data.User.Region;
           const trophy = data.User.SkillRating;
           const crown = data.User.Crowns;

           console.log(chalk.bold(`\r[ ${moment().format('HH:mm')} ] ${chalk.blueBright(`${id}`)} | ${chalk.redBright(`${username}`)} | ${chalk.cyanBright(`${country}`)} | ${chalk.cyanBright(`${region}`)} | ${chalk.greenBright(`${crown}`)} | ${chalk.yellowBright(`${trophy}`)}`));
           await delay(1500);

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

       const auth = rs.question(chalk.blueBright(chalk.bold('[+] Enter Auth Code : ')));

       while (true) {

         var ronde = "2";
         const result = await GoStumble(ronde, auth);
         if (!result) {

           console.log(chalk.redBright(`Auth Sudah Expired`));
           break;

         } else if (result.includes('User')) {
           const data = JSON.parse(result);
           const username = data.User.Username;
           const id = data.User.Id;
           const region = data.User.Region;
           const country = data.User.Country;
           const trophy = data.User.SkillRating;

           console.log(chalk.bold(`\r[ ${moment().format('HH:mm')} ] ${chalk.blueBright(`${id}`)} | ${chalk.redBright$(`{username}`)} | ${chalk.cyanBright(`${country}`)} | ${chalk.cyanBright(`${region}`)} | ${chalk.yellowBright(`${trophy}`)}`));
           await delay(1500);

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
   }

})();
