const { EntitySchema } = require("typeorm");

// TODO 
const SeguidorSchema = new EntitySchema({
    name: "Seguidores",
    tableName: 'seguidores',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        observacao: {
            type: 'varchar',
            length: 255,
        },
        aceitou: {
            type: 'boolean',
            default: false,
        },
        dt_convite: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        },
        dt_aceitou: {
            type: 'datetime',
            nullable: true,
        }
    }
});

module.exports = { SeguidorSchema };