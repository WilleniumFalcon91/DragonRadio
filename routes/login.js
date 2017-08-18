//Oauth logic 

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

const REDIRECT_URI = 'https://developer.napster.com/jsfiddle_proxy';

function fetchUserData (accessToken) {
	return $.ajax({
  	url: `${napsterAPI}/v2.1/me`,
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });	
}

function login() {
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
 
	window.open(
  	`${oauthURL}&redirect_uri=${REDIRECT_URI}`,
  	'Napster',
    `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top}, left=${left}`
  );
}

$loginButton.click(() => {
 login();
})