const Telnet = require('telnet-client');
const ping = require('ping');

const PING_HOST = 'www.google.com';
const TELNET_HOST = 'localhost';
const TELNET_PORT = 5510
const AT_COMMAND = 'AT!GSTATUS?';

async function printBand(){
  let connection = new Telnet();
  let params = {
    host: TELNET_HOST,
    port: TELNET_PORT,
    timeout: 1500
  }
  await connection.connect(params);
  let res =  await connection.exec('AT!GETBAND')
  console.log('BAND', new Date().toISOString(), res);
}

function pingHost(){
   ping.sys.probe(PING_HOST, (up) => {
  	console.log('is up', up, new Date().toISOString());
  })
}

function intervalFunc() {
  pingHost();
  printBand();
}

setInterval(intervalFunc, 1500);
