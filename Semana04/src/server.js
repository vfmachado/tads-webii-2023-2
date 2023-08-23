console.log("FUNCIONA!");

const path = require('path');

const express = require("express"); 
const app = express();


app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// set views => indicar onde estão os arquivos de views
// o primeiro views é reservado do express
// o segundo views é o nome da pasta (caminho)
app.set('views', path.join(__dirname, 'views'));

const users = [
    { name: 'Geraldo' },
    { name: 'Victor' },
    { name: 'Isa' },
    { name: 'Vini', professor: true },
]

const { usersRouter } = require('./routes/users-routes');
app.use(usersRouter);

app.get('/add-user', (req, res) => {
    res.render('add-user', { NUMERO_AULA: '04' });
});

app.post('/add-user', (req, res) => {

    console.log({ body: req.body})
    // const { name, stack } = req.body;
    const user = req.body;
    users.push(user);

    // res.send(JSON.stringify({
    //     query: req.query,
    //     body: {teste: "OI", ...req.body }
    // }, null, 2));

    res.redirect('/users')
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
