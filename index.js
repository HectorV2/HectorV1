const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');
const delay = require('delay');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
      'use_response_compression': 'true',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64))',
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
`));

  const auth = rs.question(chalk.cyanBright(chalk.bold('[+] Enter Auth Keys : '));
  const time = rs.question(chalk.cyanBright(chalk.bold('[+] Enter Delay Max 1000 : '));
  console.log('Sabar Tod');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

        console.log(chalk.redBright(`Auth Sudah Expired`));

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

   console.log(chalk.cyanBright(chalk.bold(`\r
♨ [${moment().format('HH:mm:ss')}] ♨
~  ${(`Country : ${country}`)}
~  ${(`Username : ${username}`)}  
~  ${(`Crown : ${crown}`)}  
~  ${(`Trophy : ${trophy}`)}
~  ${(`Status : ✓ Success`)}`)));
      await delay(time)

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Your Account has been Banned`));
     break;
    }
  }


}})();
