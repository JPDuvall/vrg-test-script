const fs = require('fs');
const readLine = require('readline');
const Curl = require('node-libcurl').Curl;
// const URL = 'competitions.vrg.local/login';
const URL = 'competitions.virtualrobotgames.ca/login';

var user, pass;

async function login(u, p) {
    var curl = new Curl();

    curl.setOpt('USERPWD', `${u}:${p}`);
    curl.setOpt('URL', URL);

    console.info('Fetching data...');
    curl.on('end', async function(statusCode, body, headers) {
        if(statusCode != 401) {
            var b = JSON.parse(body);

            console.log(statusCode);

            await fetchData(b.token);
            await saveFile(`${b.token},${b.user_id},${b.username}`);
        }
        else {
            console.error(body);
        }

        await this.close();
    });

    curl.on('error', curl.close.bind(curl));
    await curl.perform();
}

async function fetchData(token) {
    var curl = new Curl();

    console.log('Fetching competition data...');

    curl.setOpt('POSTFIELDS', 'token=' + token);
    curl.setOpt('URL', 'competitions.virtualrobotgames.ca/my-data');

    await curl.on('end', function(statusCode, body, headers) {
        var b = JSON.parse(body);
        // b.registrations = JSON.parse(b.registrations);
        console.info(b);

        this.close();
    });

    curl.on('error', curl.close.bind(curl));
    await curl.perform();
}

function openFile() {
    fs.readFile('test.txt', function(err, data) {
        if(data) {
            var txt = data.toString().split(',');
            fetchData(txt[0]);
        }
        else {
            getInput();
        }
    });
}

function saveFile(data) {
    console.log('Writing file...')
    fs.writeFile('test.txt', data, function(err) {
        if (err) throw err;
        console.log('File saved');
        openFile();
    });
}

function getInput() {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Username: ', async (answer) => {
        user = answer;
        rl.question('Password: ', (answer) => {
            pass = answer;
            rl.close();
            login(user, pass);
        });
    });
}

openFile();