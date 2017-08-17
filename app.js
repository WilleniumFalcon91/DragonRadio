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


//Test

// const tracksTemplateSource = document.getElementById('tracks-template').innerHTML;
// const Handlebars = require('Handlebars');
// const tracksTemplate = Handlebars.compile(tracksTemplateSource);

// const $tracks = $('#tracks-container');

// const getTopTracks = $.get('https://api.napster.com/v2.1/tracks/top?apikey=NmYxOWEyYmUtZDc0MC00NWIyLWIxYWEtNjg4YmE5YmU2YTg4');

// getTopTracks
//   .then((response) => {
//     $tracks.html(tracksTemplate(response));
//     console.log(response);
//   });
// const getTopTracks = $.get('https://api.napster.com/v2.1/tracks/top?apikey=NmYxOWEyYmUtZDc0MC00NWIyLWIxYWEtNjg4YmE5YmU2YTg4');
// var sort = [] ;

//   getTopTracks.then(function (response) {
//     // $tracks.html(tracksTemplate(response))
//     sort = response;
//     console.log(response);
//   });
// To sort through the API in devtools use:
//  sort["tracks"][4]["explicit"]
//  sort[name of the array][number of the object]
// [what you wanna see]

const playlistTemplateSource = document.getElementById('playlist-template').innerHTML;
const Handlebars = require('Handlebars');
const playlistTemplate = Handlebars.compile(playlistTemplateSource);

const tracksTemplateSource = document.getElementById('tracks-template').innerHTML;
const tracksTemplate = Handlebars.compile(tracksTemplateSource);

const $playlist = $('#playlist-container');
const $tracks = $('#tracks-container');
const $mainTitle = $('.header');
const $backButton = $('.back-button');

const getTopPlaylists = $.get('https://api.napster.com/v2.0/playlists?apikey=NmYxOWEyYmUtZDc0MC00NWIyLWIxYWEtNjg4YmE5YmU2YTg4');

function getPlaylistTracks(id) {
  return $.get('https://api.napster.com/v2.0/playlists/' + id + '/tracks?apikey=NmYxOWEyYmUtZDc0MC00NWIyLWIxYWEtNjg4YmE5YmU2YTg4&limit=200');
}

$backButton.click(() => {
	$playlist.show();
  $tracks.hide();
  $mainTitle.text('Top Playlists');
  $backButton.hide();
});

$backButton.hide(); // Initally hide back button.

function changeToTracks(playlistName) {
	$mainTitle.text(playlistName);
  $playlist.hide();
	$tracks.show();
  $backButton.show();
  
  return renderTracks;
}

function renderTracks(response) {
  $tracks.html(tracksTemplate(response));
}

getTopPlaylists
  .then((response) => {
    $playlist.html(playlistTemplate(response));
    addPlaylistListener();
  });

function addPlaylistListener() {
  $('.cover').on('click', (e) => {
    const $playlist = $(e.target);
    getPlaylistTracks($playlist.data('playlistId'))
      .then(changeToTracks($playlist.data('playlistName')));
  });
}


//database config 
require('dotenv').config()
const pg = require('pg-promise')();
const dbConfig = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
}; 

module.exports = pg(dbConfig);

const db = require('./db');


class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    save() {
        if (this.user_id) {
            return db.one(`
            update users
            set 
                name=${this.name},
                email=${this.email},
            where user_id=${this.user_id}
            `);
        } else {

        
        return db.one(`
            insert into users 
            (name, email)
            values
            ('${this.name}', '${this.email}')
            returning user_id;
        `);
        }
    }
    static get(id) {
        return db.one(`
            select user_id, name, email from users where user_id=${id};
        `).then((result) => {
            let u = new User();
            u.user_id = result.user_id;
            u.name = result.name;
            u.email = result.email;
            return u;
        })
    }
}

module.exports = User;

//Oauth logic 

const width = 700;
const height = 400;
const left = (screen.width / 2) - (width / 2);
const top = (screen.height / 2) - (height / 2);
const $loginButton = $('#btn-login');
const $loginSection = $('#login-section');
const $result = $('#result');
const templateSource = document.getElementById('result-template').innerHTML
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