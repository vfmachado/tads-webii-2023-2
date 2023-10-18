// 1 PASSO - prover uma conexao com banco de dados
// no typeorm chamamos de datasource
const { DataSource, EntitySchema} = require('typeorm');
const { UserSchema } = require('./models/User');
const { dataSource } = require('./config/datasource');


// PODEMOS CRIAR VARIOS DATASOURCES APONTANDO PARA BANCOS DIFERENTES
// const dataSourceClientA = new typeorm.DataSource({
//     type: 'sqlite',
//     database: 'dadosA.db'
// })


dataSource.initialize().then(async connected => {
    console.log({ connected })

    const usersRepository = dataSource.getRepository(UserSchema);
    const users = await usersRepository.find();
    console.log({ users });

    // PODEMOS, MAS NAO DEVEMOS =)
    //dataSource.query('')
    
    // exemplo de insert
    // await usersRepository.save({
    //     firstname: 'Teste',
    //     lastname: 'da Silva',
    //     premium: false
    // })
})