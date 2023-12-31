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
    }
})

module.exports = { UserSchema }