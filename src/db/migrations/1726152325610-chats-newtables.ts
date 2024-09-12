import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatsNewtables1726152325610 implements MigrationInterface {
    name = 'ChatsNewtables1726152325610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message_receipts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isRead\` tinyint NOT NULL DEFAULT 0, \`isDelivered\` tinyint NOT NULL DEFAULT 0, \`readAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`deliveredAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`recipient_id\` varchar(36) NULL, \`message_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`sender_id\` varchar(36) NULL, \`conversation_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conversation\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NULL, \`is_group\` tinyint NOT NULL DEFAULT 0, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conversation_participants\` (\`id\` varchar(36) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'participant', \`joined_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`left_at\` timestamp NULL, \`user_id\` varchar(36) NULL, \`conversation_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`participants\` (\`id\` varchar(36) NOT NULL, \`conversation_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP COLUMN \`recipient_id\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP COLUMN \`message_id\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`sender_id\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`conversation_id\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD \`recipient_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD \`message_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`sender_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`conversation_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD \`recipientId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD \`messageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`senderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`conversationId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD CONSTRAINT \`FK_c65df20e6fdca33f647db14f172\` FOREIGN KEY (\`recipient_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD CONSTRAINT \`FK_781b10a45182ec12ba07780edc6\` FOREIGN KEY (\`message_id\`) REFERENCES \`messages\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_22133395bd13b970ccd0c34ab22\` FOREIGN KEY (\`sender_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_3bc55a7c3f9ed54b520bb5cfe23\` FOREIGN KEY (\`conversation_id\`) REFERENCES \`conversation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation_participants\` ADD CONSTRAINT \`FK_377d4041a495b81ee1a85ae026f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation_participants\` ADD CONSTRAINT \`FK_1559e8a16b828f2e836a2312800\` FOREIGN KEY (\`conversation_id\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD CONSTRAINT \`FK_caa243145f3fbce61fd96e788b3\` FOREIGN KEY (\`recipientId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD CONSTRAINT \`FK_7b1bd1051c19b85ceb184fee667\` FOREIGN KEY (\`messageId\`) REFERENCES \`messages\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_2db9cf2b3ca111742793f6c37ce\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_e5663ce0c730b2de83445e2fd19\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_e5663ce0c730b2de83445e2fd19\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP FOREIGN KEY \`FK_7b1bd1051c19b85ceb184fee667\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP FOREIGN KEY \`FK_caa243145f3fbce61fd96e788b3\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participants\` DROP FOREIGN KEY \`FK_1559e8a16b828f2e836a2312800\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participants\` DROP FOREIGN KEY \`FK_377d4041a495b81ee1a85ae026f\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_3bc55a7c3f9ed54b520bb5cfe23\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_22133395bd13b970ccd0c34ab22\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP FOREIGN KEY \`FK_781b10a45182ec12ba07780edc6\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP FOREIGN KEY \`FK_c65df20e6fdca33f647db14f172\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`conversationId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`senderId\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP COLUMN \`messageId\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP COLUMN \`recipientId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`conversation_id\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`sender_id\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP COLUMN \`message_id\``);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` DROP COLUMN \`recipient_id\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`conversation_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`sender_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD \`message_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`message_receipts\` ADD \`recipient_id\` varchar(36) NULL`);
        await queryRunner.query(`DROP TABLE \`participants\``);
        await queryRunner.query(`DROP TABLE \`conversation_participants\``);
        await queryRunner.query(`DROP TABLE \`conversation\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`DROP TABLE \`message_receipts\``);
    }

}
