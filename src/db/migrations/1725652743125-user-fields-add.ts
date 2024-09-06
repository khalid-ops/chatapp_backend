import { MigrationInterface, QueryRunner } from "typeorm";

export class UserFieldsAdd1725652743125 implements MigrationInterface {
    name = 'UserFieldsAdd1725652743125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`username\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
