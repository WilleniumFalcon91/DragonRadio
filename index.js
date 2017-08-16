// //Take info from index.html and displays on DOM (Electron).

const electron = require('electron');
const {app} = require('electron');
const {BrowserWindow} = require('electron');


electron.app.on('ready', function () {  
var mainWindow = new electron.BrowserWindow({width: 600, height: 800})  
mainWindow.loadURL('file://' + __dirname + '/index.html')  
}) 

module.exports = require;