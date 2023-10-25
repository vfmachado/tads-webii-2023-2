const { EntitySchema } = require("typeorm");

const PhotoSchema = new EntitySchema({
    name: "photo",
    tableName: 'photo',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        // userId: {
        //     type: 'int',
        //     nullable: false,
        // },
        url: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        description: {
            type: 'text',
        },
        createdAt: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: {
                name: 'userId',
                referencedColumnName: 'id'
            }
        }
    }
})

module.exports = { PhotoSchema }