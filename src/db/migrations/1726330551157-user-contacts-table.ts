import { MigrationInterface, QueryRunner } from "typeorm";

export class UserContactsTable1726330551157 implements MigrationInterface {
    name = 'UserContactsTable1726330551157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP FOREIGN KEY \`FK_7b1bd1051c19b85ceb184fee667\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP FOREIGN KEY \`FK_caa243145f3fbce61fd96e788b3\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_e5663ce0c730b2de83445e2fd19\``);
        await queryRunner.query(`CREATE TABLE \`user_contacts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('pending', 'accepted', 'blocked') NOT NULL DEFAULT 'pending', \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`accepted_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`userId\` varchar(36) NULL, \`contactId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP COLUMN \`messageId\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP COLUMN \`recipientId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`conversationId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`senderId\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`accepted_at\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`accepted_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`acceptedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD CONSTRAINT \`FK_30fcfbc780a02d200e0589b2886\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD CONSTRAINT \`FK_1dc56196793173eb5c613fb72cb\` FOREIGN KEY (\`contactId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP FOREIGN KEY \`FK_1dc56196793173eb5c613fb72cb\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP FOREIGN KEY \`FK_30fcfbc780a02d200e0589b2886\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`acceptedAt\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`accepted_at\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`accepted_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_contacts\` ADD \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`senderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`conversationId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD \`recipientId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD \`messageId\` varchar(36) NULL`);
        await queryRunner.query(`DROP TABLE \`user_contacts\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_e5663ce0c730b2de83445e2fd19\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_2db9cf2b3ca111742793f6c37ce\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD CONSTRAINT \`FK_caa243145f3fbce61fd96e788b3\` FOREIGN KEY (\`recipientId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD CONSTRAINT \`FK_7b1bd1051c19b85ceb184fee667\` FOREIGN KEY (\`messageId\`) REFERENCES \`messages\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
