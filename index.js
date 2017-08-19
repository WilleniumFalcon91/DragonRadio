// //Take info from index.html and displays on DOM (Electron).

const electron = require('electron');
const {app} = require('electron');
const {BrowserWindow} = require('electron');
const rq = require('electron-handlebars');
var path = require('path');
const express = require('express');

var exp = express();

exp.set('views', path.join(__dirname, 'views'));
exp.set('view engine', 'hbs');


// exp.use('/', index);
// exp.use('/topten', topten);
let mainWindow;
let chatroom;
 
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
  chatroom = new BrowserWindow({
    show: false,
    width: 400,
    height: 900,
  });
  chatroom.loadURL('https://www.google.com/');
  chatroom.webContents.on('did-finish-load', () => {
    chatroom.show();
    chatroom.focus();
  })
});



module.exports = require;