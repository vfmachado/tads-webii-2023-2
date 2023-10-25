const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddPhotoTable1698189761297 {
    name = 'AddPhotoTable1698189761297'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar(255) NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "photo"`);
    }
}
