// //Take info from index.html and displays on DOM (Electron).

const electron = require('electron');
const {app} = require('electron');
const {BrowserWindow} = require('electron');
const rq = require('electron-handlebars');


// electron.app.on('ready', function () {  
// var mainWindow = new electron.BrowserWindow({width: 600, height: 800})  
// mainWindow.loadURL('file://' + __dirname + '/index.html')  
// }) 

// const { app, BrowserWindow } = require('electron');
// const rq = require('require-electron');
 
// require('electron-handlebars')({
//   // Template bindings go here! 
//   title: 'Hello, World!',
//   body: 'The quick brown fox jumps over the lazy dog.',
// });
 
// let mainWindow = null;
 
// app.on('window-all-closed', () => app.quit());
 
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 900,
    height: 800,
  });
  mainWindow.loadURL(`file://${__dirname}/views/index.hbs`);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });
});
 

module.exports = require;