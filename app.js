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

//Take info from index.html and displays on DOM (Electron).

const electron = require('electron');
const {app} = require('electron');
const {BrowserWindow} = require('electron');


// electron.app.on('ready', function () {  
// var mainWindow = new electron.BrowserWindow({width: 600, height: 800})  
// mainWindow.loadURL('file://' + __dirname + '/index.html')  
// }) 

// module.exports = require;

//Test
const getTopTracks = $.get('https://api.napster.com/v2.1/tracks/top?apikey=NmYxOWEyYmUtZDc0MC00NWIyLWIxYWEtNjg4YmE5YmU2YTg4');
var sort = [] ;

  getTopTracks.then(function (response) {
    // $tracks.html(tracksTemplate(response))
    sort = response;
    console.log(response);
  });
// To sort through the API in devtools use:
//  sort["tracks"][4]["explicit"]
//  sort[name of the array][number of the object]
// [what you wanna see]
