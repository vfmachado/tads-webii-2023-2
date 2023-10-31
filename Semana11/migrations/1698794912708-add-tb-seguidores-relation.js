const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddTbSeguidoresRelation1698794912708 {
    name = 'AddTbSeguidoresRelation1698794912708'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "seguidores" ("user_id" integer NOT NULL, "seguidor_id" integer NOT NULL, PRIMARY KEY ("user_id", "seguidor_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91dcffb43e6995d4adc69e72aa" ON "seguidores" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_620391fc7564164052dafcc2f1" ON "seguidores" ("seguidor_id") `);
        await queryRunner.query(`DROP INDEX "IDX_91dcffb43e6995d4adc69e72aa"`);
        await queryRunner.query(`DROP INDEX "IDX_620391fc7564164052dafcc2f1"`);
        await queryRunner.query(`CREATE TABLE "temporary_seguidores" ("user_id" integer NOT NULL, "seguidor_id" integer NOT NULL, CONSTRAINT "FK_91dcffb43e6995d4adc69e72aa5" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_620391fc7564164052dafcc2f17" FOREIGN KEY ("seguidor_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("user_id", "seguidor_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_seguidores"("user_id", "seguidor_id") SELECT "user_id", "seguidor_id" FROM "seguidores"`);
        await queryRunner.query(`DROP TABLE "seguidores"`);
        await queryRunner.query(`ALTER TABLE "temporary_seguidores" RENAME TO "seguidores"`);
        await queryRunner.query(`CREATE INDEX "IDX_91dcffb43e6995d4adc69e72aa" ON "seguidores" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_620391fc7564164052dafcc2f1" ON "seguidores" ("seguidor_id") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_620391fc7564164052dafcc2f1"`);
        await queryRunner.query(`DROP INDEX "IDX_91dcffb43e6995d4adc69e72aa"`);
        await queryRunner.query(`ALTER TABLE "seguidores" RENAME TO "temporary_seguidores"`);
        await queryRunner.query(`CREATE TABLE "seguidores" ("user_id" integer NOT NULL, "seguidor_id" integer NOT NULL, PRIMARY KEY ("user_id", "seguidor_id"))`);
        await queryRunner.query(`INSERT INTO "seguidores"("user_id", "seguidor_id") SELECT "user_id", "seguidor_id" FROM "temporary_seguidores"`);
        await queryRunner.query(`DROP TABLE "temporary_seguidores"`);
        await queryRunner.query(`CREATE INDEX "IDX_620391fc7564164052dafcc2f1" ON "seguidores" ("seguidor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_91dcffb43e6995d4adc69e72aa" ON "seguidores" ("user_id") `);
        await queryRunner.query(`DROP INDEX "IDX_620391fc7564164052dafcc2f1"`);
        await queryRunner.query(`DROP INDEX "IDX_91dcffb43e6995d4adc69e72aa"`);
        await queryRunner.query(`DROP TABLE "seguidores"`);
    }
}
