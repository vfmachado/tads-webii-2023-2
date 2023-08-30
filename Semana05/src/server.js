console.log("FUNCIONA!");

const path = require('path');

const express = require("express"); 
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

// FORM DATA
app.use(express.urlencoded({ extended: false }));
// API JSON
app.use(express.json());

app.set('view engine', 'ejs');

// set views => indicar onde estão os arquivos de views
// o primeiro views é reservado do express
// o segundo views é o nome da pasta (caminho)
app.set('views', path.join(__dirname, 'views'));


const { usersRouter } = require('./routes/users-routes');
app.use(usersRouter);

app.get('/add-user', (req, res) => {
    res.render('add-user', { NUMERO_AULA: '04' });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// EXEMPLO PROMISE
// function a(num) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let conta = num + 1;
//         resolve(conta);
//         }, 1000);
//     });
// }

// async function main() {
//     const resultado = await a(1);
//     console.log(resultado)
// }
// main();
