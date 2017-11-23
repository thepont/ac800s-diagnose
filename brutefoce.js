const bf = require('bruteforce');
const TELNET_HOST = "192.168.1.1"
const TELNET_PORT = 5510
const VALID_CHARS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];

const Telnet = require('telnet-rxjs').Telnet;
const client = Telnet.client(`${TELNET_HOST}:${TELNET_PORT}`);
const Rx = require('rxjs/Rx');

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


function testPasswords(passwords){
  return connected.then(() => { 
    return rx.Observable
      .from(passwords)
      .map(password => client.sendln(`AT!ENTERCND=${password}`))
      .toPromise();
  })
  // console.log(password);
}

bf({
  len: 10,
  chars: VALID_CHARS,
  end: testPasswords,
});
