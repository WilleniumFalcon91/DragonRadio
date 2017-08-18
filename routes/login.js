//Oauth logic 

const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

const width = 700;
const height = 400;
const left = (screen.width / 2) - (width / 2);
const top = (screen.height / 2) - (height / 2);
const $loginButton = $('#btn-login');
const $loginSection = $('#login-section');
const $result = $('#result');
const templateSource = document.getElementById('result-template').innerHTML
const Handlebars = require('Handlebars');
const resultsTemplate = Handlebars.compile(templateSource);

const napsterAPI = 'https://api.napster.com';
const APIKEY = 'NmYxOWEyYmUtZDc0MC00NWIyLWIxYWEtNjg4YmE5YmU2YTg4';
const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${APIKEY}&response_type=code`;

const REDIRECT_URI = 'http://localhost:5000/auth/callback';

function fetchUserData (accessToken) {
	return $.ajax({
  	url: `${napsterAPI}/v2.1/me`,
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });	
}

function login(e) {
  
  debugger;
	window.addEventListener('message',(event) => {
    var hash = JSON.parse(event.data);
    if (hash.type === 'access_token') {
      fetchUserData(hash.access_token)
      	.then((data) => {
        	$loginSection.hide();
          $result.html(resultsTemplate(data.me));
          $result.show();
        });
    }
  }, false);
 
  var openURL = `${oauthURL}&redirect_uri=${REDIRECT_URI}`;
  // console.log();

var win = new BrowserWindow({width: 800, height: 600, webPreferences:{"nodeIntegration": false}});
win.loadURL(openURL);
}

$loginButton.click((e) => {
 login(e);
 
})