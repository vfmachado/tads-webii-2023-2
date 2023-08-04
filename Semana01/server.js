const http = require('http');

// HTTP STATUS CODE
// CONTENT-TYPE = O TIPO DA RESPOSTA DO SERVIDOR
// REQUEST - INFORMACOES QUE O USUARIO SOLICITOU
// RESPOSTA - SAIDA DO SERVIDOR

// ROTA - CAMINHO QUE O USUARIO SOLICITOU
// QUERY PARAMETER - PARAMETROS PASSADOS NA URL
// BODY - PAYLOAD DA REQUISICAO

const server = http.createServer((request, respnse) => {
    respnse.writeHead(200, { 'Content-Type': 'text/html' });
    respnse.end('<h1>Hello WEB II - 2023/2 - Super Animadaaaa!</h1>');
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});