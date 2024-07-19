import { MigrationInterface, QueryRunner } from "typeorm";

export class UserGidMigration1721394814119 implements MigrationInterface {
    name = 'UserGidMigration1721394814119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`googleId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`googleId\``);
    }

}
