// 1 PASSO - prover uma conexao com banco de dados
// no typeorm chamamos de datasource
const { DataSource, EntitySchema} = require('typeorm');
const { UserSchema } = require('./models/User');
const { dataSource } = require('./config/datasource');
const { PhotoSchema } = require('./models/Photo');


// PODEMOS CRIAR VARIOS DATASOURCES APONTANDO PARA BANCOS DIFERENTES
// const dataSourceClientA = new typeorm.DataSource({
//     type: 'sqlite',
//     database: 'dadosA.db'
// });


dataSource.initialize().then(async connected => {
    console.log({ connected })

    const usersRepository = dataSource.getRepository(UserSchema);
    const users = await usersRepository.find();
    console.log({ users });

    const photoRepostiory = dataSource.getRepository(PhotoSchema);
    const photos = await photoRepostiory.find();
    console.log({ photos })

    // QUEM SAO AS FOTOS DO USUARIO 1
    const userId1 = await usersRepository.findOne({ 
        where: { id: 1 },
        relations: [ 'photos' ]
    });
    // const userId1 = await usersRepository.findOneBy({ id: 1 });
    console.log(JSON.stringify(userId1, null, 2))

    // FILTRO NAS PHOTOS DE UM USUARIO
    const userId2 = await usersRepository.findOne({ 
        where: { id: 1, photos:  { id: 2 } },
        relations: [ 'photos' ]
    });
    console.log(JSON.stringify(userId2, null, 2))

    // TODOS USUARIOS COM TODAS AS FOTOS
    const allUsers = await usersRepository.find({ relations: [ 'photos' ]});
    console.log({ allUsers });

    const user7 = await usersRepository.find({
        where: {
            id: 7
        },
        relations: [
            'seguidores'
        ]
    });

    // TODOS OS USUARIOS QUE ALGUEM SEGUE


    console.log(" ===== ");
    console.log({ user7: JSON.stringify(user7, null, 2) })

    const teste = await dataSource.query('select * from seguidores where seguidor_id = 4');
    console.log({ teste })
    // PODEMOS, MAS NAO DEVEMOS =)
    //dataSource.query('')
    
    // exemplo de insert
    // await usersRepository.save({
    //     firstname: 'Teste',
    //     lastname: 'da Silva',
    //     premium: false
    // })
})