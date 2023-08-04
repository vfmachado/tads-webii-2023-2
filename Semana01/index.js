const text = (a) => {
    setTimeout(() => {
        console.log(a);
    }, Math.random() * 1000);
}

text('INICIO');

text('MEIO');

text('FIM');

const buscaBanco = async (id) => {
    return "Vinicius";
}


const nome = buscaBanco(1);
console.log(nome);

/*
OBJETOS EM JS
*/
const pessoa = {
    nome: "Vinicius",
    idade: 20,
}

console.log(pessoa.idade);
console.log(pessoa['idade']);
console.log({ pessoa });

// PESSOA É PASSADO POR REFERENCIA PARA A FUNCAO
const mudaNome = (p, nome) => {
    p.nome = nome;
}

mudaNome(pessoa, "João");
console.log({ pessoa });

/*
ARRAYS EM JS
*/
const array = [1, 2, 3, 4, 5];
console.log(array[0]);
// FILTER
const pares = array.filter((a) => a % 2 == 0);

// FIND - PRIMEIRO ELEMENTO QUE SATISFAZ A CONDICAO
const par = array.find((a) => a % 2 == 0);

// MAP - APLICA UMA FUNCAO EM CADA ELEMENTO DO ARRAY
const dobro = array.map((a) => a * 2);

// INCLUDES - VERIFICA SE O ELEMENTO ESTÁ NO ARRAY
const tem = array.includes(3);

// INDEXOF - RETORNA O INDICE DO ELEMENTO NO ARRAY
const indice = array.indexOf(3);

// PUSH - ADICIONA UM ELEMENTO NO FINAL DO ARRAY
array.push(6);

// SPLICE - REMOVE ELEMENTOS DO ARRAY
// NO EXEMPLO ABAIXO, REMOVE O PRIMEIRO ELEMENTO DO ARRAY
// 0 => INDICE DO ELEMENTO QUE SERÁ REMOVIDO
// 1 => QUANTIDADE DE ELEMENTOS QUE SERÃO REMOVIDOS
array.splice(2, 1);

// SLICE - RETORNA UMA PARTE DO ARRAY
// NO EXEMPLO ABAIXO, RETORNA UM NOVO ARRAY COM OS ELEMENTOS
// DO INDICE 1 ATÉ O INDICE 3
const novoArray = array.slice(1, 3);

// FOREACH - PERCORRE O ARRAY
// nao utilizem funcoes que modifiquem o vetor em um foreach
array.forEach((a) => console.log(a));

/*
CLASSES EM JS
*/
class Carro {
    constructor(marca, modelo, cor) {
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
    }
}

const carro = new Carro("Fiat", "Uno", "Vermelho");

// FUNCAO PARA CRIAR CARRO
const criaCarro = (marca, modelo, cor) => {
    return {
        marca,
        modelo,
        cor,
    }
}

