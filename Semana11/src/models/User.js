const { EntitySchema } = require("typeorm");

const UserSchema = new EntitySchema({
    name: "User",
    tableName: 'user',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        firstname: {
            type: 'varchar',
            length: 255,
        },
        lastname: {
            type: 'varchar',
            length: 255,
            nullable: false,
            default: ''
        },
        premium: {
            type: 'boolean',
            default: true,
        },
        email: {
            type: 'varchar',
            length: 255,
            nullable: true
        },
        password: {
            type: 'varchar',
            length: 255,
            default: 'SENHA PADRAO QUE NAO FUNCIONA'
        },
        photo: {
            type: 'varchar',
            length: 255,
            nullable: true,
        }
    },
    relations: {
        photos: {
            type: 'one-to-many',
            target: 'photo',    // tabela
            inverseSide: 'user'
        },
        
        seguidores: {   // NOME DA RELACAO
            type: 'many-to-many',    // TIPO DA RELACAO
            target: 'user',         // TABELA ALVO DESSA RELACAO
            joinTable: {        // RELACOES MANY TO MANY REQUEREM UMA JOIN TABLE
                name: 'seguidores', 
                
                joinColumn: {       // MANY TO MABY TEM 2 JOIN COLUMNS
                    name: 'user_id',
                    referencedColumnName: 'id'
                },
                inverseJoinColumn: {
                    name: 'seguidor_id',
                    referencedColumnName: 'id'
                }
            }
        }
        
    }
})

module.exports = { UserSchema }