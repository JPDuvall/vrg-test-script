const fs = require('fs');
const readLine = require('readline');
const Curl = require('node-libcurl').Curl;
// const URL = 'competitions.vrg.local/login';
const URL = 'competitions.virtualrobotgames.ca/login';

var registration_id = '9b1de6b3-a24f-4c97-be71-8ae0f8903b5b';
var bracket_id = '5dba06ab-6919-479e-a060-9b7317de0af6';
var score = 0;
var time = 1200.01;

async function submitScore(string) {
    var curl = new Curl();

    console.log('Submitting Score...');

    curl.setOpt('POSTFIELDS', 'data=' + string);
    curl.setOpt('URL', 'competitions.virtualrobotgames.ca');

    await curl.on('end', function(statusCode, body, headers) {
        // var b = JSON.parse(body);
        // b.registrations = JSON.parse(b.registrations);
        console.info(body);

        this.close();
    });

    curl.on('error', curl.close.bind(curl));
    await curl.perform();
}

submitScore(`{\"data\":{\"type\":\"results\",\"attributes\":{\"registration_id\":\"${registration_id}\",\"bracket_id\":\"${bracket_id}\",\"score\":${score},\"time\":${time}}}}`);