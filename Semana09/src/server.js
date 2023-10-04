console.log("FUNCIONA!");

const path = require('path');

const express = require("express"); 
const app = express();

console.log({
    NODE_ENV: process.env.NODE_ENV
})


// FORM DATA (nao funciona para enctype formdata / arquivos)
app.use(express.urlencoded({ extended: false }));
// API JSON
app.use(express.json());

const session = require('express-session');

const dotenv = require('dotenv');

console.log({
    NODE_ENV: process.env.NODE_ENV
})

if (process.env.NODE_ENV == 'development')
    dotenv.config({ path: '.env.development'});
else
    dotenv.config();

const API_SECRET = process.env.API_SECRET;
console.log({ API_SECRET });

app.use(session({
    secret: API_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));


app.use('*', (req, res, next) => {
    req.session.urls = req.session.urls || [];
    req.session.urls.push(req.originalUrl);
    console.log({ 
        sessionId: req.session.id,
        session: req.session 
    });
    next();
})



app.use(express.static(path.join(__dirname, '..', 'public')));



app.set('view engine', 'ejs');

// set views => indicar onde estão os arquivos de views
// o primeiro views é reservado do express
// o segundo views é o nome da pasta (caminho)
app.set('views', path.join(__dirname, 'views'));

const { authRoutes } = require('./routes/auth-routes');
app.use(authRoutes);

const { usersRouter } = require('./routes/users-routes');
const { isAdmin } = require('./middlewares/is-admin');
app.use(usersRouter);


app.get('/add-user', isAdmin, (req, res) => {
    return res.render('add-user', { NUMERO_AULA: '08' });
});

const isOwner =  (req, res, next) => {
    if (req.session?.user?.type == 'admin') return next();
    if (req.params.id == req.session?.user?.id) return next();
    return res.status(403).send("VC NAO EH O DONO DA INFORMACAO");
}

/*
app.post('/login', (req, res) => {

    const { email, password} = req.body;

    if (email == 'admin' && password == 'admin') {
        // loga
        req.session.user = {
            id: 1,
            type: 'admin',
            name: 'Admin',
            email: 'admin@admin'
        };
        return res.send('LOGADO');
    }

    if (email == 'user' && password == 'user') {
        req.session.user = {
            id: 2,
            type: 'user',
            name: 'Usuario',
            email: 'user@user'
        };
        return res.send('LOGADO');
    }
    return res.send('VC NAO LOGOU...');

});
*/

app.get('/logout',  (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// app.use('*', (req, res) => {
//     res.status(404).send('Page not found');
// });

console.log({ envport: process.env.PORT })
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

