# Express and Routes

## Exercicios

- Para os exercícios a seguir, crie uma aplicação web com NodeJS utilizando o NPM;

1. Crie um servidor web que receba requisições para qualquer rota, indicando no response a rota, query params, ip de requisição, original url, e todos os outros atributos que julgares interessante.

2. Faça o seu servidor web responder a uma rota específica, /fatorial/:numero, onde numero é uma variável da rota, qualquer rota diferente desta deve retornar um erro 404 com a mensagem de rota não encontrada. A rota /fatorial/:numero retorna o resultado do fatorial do número indicado. Caso a variavel não seja um valor numérico, retorne erro ao usuário.

3. Extensa o servidor web para receber o numero por query parameter ao invés de parte da rota.

4. Crie um programa que receba requisições em uma rota /users/:nickaname e dê olá ao usuário, chamando-o pelo seu apelido.

5. Crie uma aplicação com as seguintes rotas:

  "/" -> "Bem vindo ao meu exercício!"
  
  "/nome/Jose" -> "Bem vindo(a) Jose!"
  "/nome/Maria" -> "Bem vindo(a) Maria!"
  
  "/repetir/Ola!/3" -> "Ola! Ola! Ola!"
  "/repetir/Oi/5" -> "Oi Oi Oi Oi Oi"
  "/repetir/Tchau/1" -> "Tchau"
  
  "/som/cao" -> "O cachorro faz 'Auuu Auuu Auuu'."
  "/som/gato" -> "O gato faz 'Miauuu'."
  "/som/vaca" -> "A vaca faz 'Mooon'."
  "/som/ovelha" -> "A ovelha faz 'Meeeee'."
  "/som/cavalo" -> "O cavalo faz 'Rhiiiii'."
  "/som/qualquer outra palavra" -> "Animal desconhecido."
  
  Qualquer outra rota -> "Página não encontrada!"

6. Faça um servidor web que receba requisições atendendo as seguintes rotas:
  a) / => retorna uma página inicial estática (sendFile)
  b) /initial.html => retorna  página inicial estática (express middleware)
  c) /users => retorna um array de users que fica salvo em um arquivo json
  d) /users/nick => retorna todos os dados de um usuário do json ou não encontrado
  e) /users/add?n=novo => insere um novo usuário e redireciona para o /users

