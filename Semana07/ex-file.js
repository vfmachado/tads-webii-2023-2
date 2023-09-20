// fs = file system
const fs = require('fs');
const path = require('path');

// __dirname = diretorio atual
// lendo arquivo txt
const buffer = fs.readFileSync(path.join(__dirname, 'dados.json'));
console.log(buffer.toString());

// reading from json
const data = JSON.parse(buffer);
console.log({
    users: data.users
})

const data2 = require('./dados.json')
console.log({ data2 });