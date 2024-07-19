import { MigrationInterface, QueryRunner } from "typeorm";

export class User2colmnsadded1720954487445 implements MigrationInterface {
    name = 'User2colmnsadded1720954487445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` varchar(255) NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`loggedIn\` tinyint NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`loggedIn\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
    }

}
