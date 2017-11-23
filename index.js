// const Telnet = require('telnet-client');
const ping = require('ping');

const PING_HOST = 'www.google.com';
const TELNET_HOST = '192.168.1.1';
const TELNET_PORT = 5510;
const AT_COMMAND = 'AT!GSTATUS?';


const Telnet = require('telnet-rxjs').Telnet;
const client = Telnet.client(`${TELNET_HOST}:${TELNET_PORT}`);


var connected = 
  new Promise((resolve) => {
    client.filter((event) => event instanceof Telnet.Event.Connected).subscribe((event) => {
        resolve();  
    });
})


client.data
  .subscribe((data) => {
      console.log(data);
  });

client.connect();

function pingHost(){
   ping.sys.probe(PING_HOST, (up) => {
  	console.log('is up', up, new Date().toISOString());
  })
}

function printBand(){
  connected.then(() => client.sendln(AT_COMMAND))
}

function intervalFunc() {
  pingHost();
  printBand();
}

setInterval(intervalFunc, 1500);

