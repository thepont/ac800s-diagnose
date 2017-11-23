const bf = require('bruteforce');
const Telnet = require('telnet-client');

const HOST = "localhost"
const PORT = 5510
const VALID_CHARS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];

async function testPassword(password){
  let params = {
    host: HOST,
    port: PORT,
  }
  await connection.connect(params);
  let res = await connection.exec(`AT!ENTERCND=${password}`);
  if(res === 'OK'){
    console.log('Found the password', password);
    process.exit(0);
  }
}

bf({
  len: 10,
  chars: VALID_CHARS,
  step: testPassword
});
