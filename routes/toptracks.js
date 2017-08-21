const tracksTemplateSource = document.getElementById('tracks-template').innerHTML;
const Handlebars = require('Handlebars');
const tracksTemplate = Handlebars.compile(tracksTemplateSource);

const $tracks = $('#tracks-container');

const getTopTracks = $.get('https://api.napster.com/v2.1/tracks/top?apikey=NmYxOWEyYmUtZDc0MC00NWIyLWIxYWEtNjg4YmE5YmU2YTg4');

getTopTracks
  .then((response) => {
    $tracks.html(tracksTemplate(response));
    console.log(response);
  });

