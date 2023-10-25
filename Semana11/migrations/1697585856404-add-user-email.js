const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUserEmail1697585856404 {
    name = 'AddUserEmail1697585856404'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar(255) NOT NULL, "premium" boolean NOT NULL DEFAULT (1), "lastname" varchar(255) NOT NULL DEFAULT (''), "email" varchar(255))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstname", "premium", "lastname") SELECT "id", "firstname", "premium", "lastname" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar(255) NOT NULL, "premium" boolean NOT NULL DEFAULT (1), "lastname" varchar(255) NOT NULL DEFAULT (''))`);
        await queryRunner.query(`INSERT INTO "user"("id", "firstname", "premium", "lastname") SELECT "id", "firstname", "premium", "lastname" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }
}
