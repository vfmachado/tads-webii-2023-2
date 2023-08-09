console.log("FUNCIONA!");

const path = require('path');

// require = import
const express = require("express"); 

// express() é uma funcao que inicializa o express
// inicializa um server http do node
const app = express();

// "pasta publica - arquivos estaticos"

// para nao precisar fazer as 3 linhas abaixo
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });
app.use(express.static(path.join(__dirname, '..', 'public')));


// ESTRUTURA DAS ROTAS
// SERVER.METHOD(PATH, HANDLER);
// app.get
// app.post

// METHODS HTTP
/*
    GET* -> pegar informacoes
    POST* -> enviar informacoes
    PUT -> atualizar informacoes (TOTAL)
    PATCH -> atualizar informacoes (PARCIAL)
    DELETE -> deletar informacoes
    OPTIONS -> informacoes sobre a rota
*/

// MIDDLEWARE - ALGUMA COISA NO MEIO
//  ENTRE A REQUEST E A  EXEUCUÇÃO DA ROTA
// DANDO A POSSIBILIDADE DE SEREM VARIOS MIDDLEWARE
let totalRequests = 0;
app.use('*', (req, res, next) => {
    //console.log("MIDDLEWARE");
    totalRequests++;
    console.log({ totalRequests });

    //adicionar no ciclo de vida do request uma informação adicional
    req.totalRequests = totalRequests;

    // adicionar informacoes no header do response
    res.setHeader('total-requests', totalRequests);

    // segue a execução das rotas / middlewares na ordem em que foram declarados
    next();
});

const isEvenRequest = (req, res, next) => {
    if (req.totalRequests % 2 === 0) {
        next();
    } else {
        return res.send('OOPS NAO PODE');
    }
};

app.get('/private/*', isEvenRequest,  (req, res) => {
    // teria algum tipo de verificacao para saber se o usuario esta logado
    // busca url completa
    const restoDoCaminho = req.url.split('/private')[1];
    res.sendFile(path.join(__dirname, '..', 'private', restoDoCaminho));
});


const meuMiddleware = (req, res, next) => {
    console.log("MEU MIDDLEWARE");
    next();
};

//  soma?n1=5&n2=7
app.get('/soma', (req, res) => {
    // req.query -> parametros de query

    /*
        query parameters
        - limitação de tamanho
        - a informação é transparente (cuidado com informações sensíveis)
        - não é possível enviar arquivos (binarios)
        - idealmente, opcional
        - nao recomendado para objetos complexos
    */
    
    n1 = parseInt(req.query.n1);
    n2 = parseInt(req.query.n2);
    res.send("SOMA: " + (n1 + n2));
});

// obrigatoriamente a rota create tem que ser antes da rota :id
// NA REAL... NAO FAÇAM ISSO
app.get('/products/create', meuMiddleware,  (req, res) => {
    res.send("CREATE");
});

// :id -> parametro de rota
app.get('/products/:id', meuMiddleware, (req, res) => {
    // req -> request
    // res -> response
    // req.params -> parametros de rota
    res.send("ID: " + req.params.id);
});

// * é qualquer coisa MESMO ... incluindo subrotas
app.use('/users/*', (req, res) => {
    res.send("USERS");
});

// '*' -> coringa, qualquer rota
// ultima rota adicionada seja um 404
app.use('*', (req, res) => {
    res.status(404).send("Nao encontrado");
});

// listen -> inicializa o servidor escutando em determinada porta
app.listen(3000, () => {
    console.log("ESCUTANDO NA PORTA 3000");
});