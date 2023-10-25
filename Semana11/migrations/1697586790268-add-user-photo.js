const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUserPhoto1697586790268 {
    name = 'AddUserPhoto1697586790268'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar(255) NOT NULL, "premium" boolean NOT NULL DEFAULT (1), "lastname" varchar(255) NOT NULL DEFAULT (''), "email" varchar(255), "password" varchar(255) NOT NULL DEFAULT ('SENHA PADRAO QUE NAO FUNCIONA'), "photo" varchar(255))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstname", "premium", "lastname", "email", "password") SELECT "id", "firstname", "premium", "lastname", "email", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar(255) NOT NULL, "premium" boolean NOT NULL DEFAULT (1), "lastname" varchar(255) NOT NULL DEFAULT (''), "email" varchar(255), "password" varchar(255) NOT NULL DEFAULT ('SENHA PADRAO QUE NAO FUNCIONA'))`);
        await queryRunner.query(`INSERT INTO "user"("id", "firstname", "premium", "lastname", "email", "password") SELECT "id", "firstname", "premium", "lastname", "email", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }
}
