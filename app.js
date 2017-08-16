//Actual server. Our aws instance would be here.
document.write(process.version);
var net = require('net');
var client = net.connect({port: 8080}, function() {
   console.log('Connection established!');  
    });

client.on('data', function(data) {
   document.write(data.toString());
   client.end();
    });

client.on('end', function() { 
   console.log('Disconnected :(');
    });


module.exports = require;