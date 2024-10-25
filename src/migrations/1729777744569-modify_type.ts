import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyType1729777744569 implements MigrationInterface {
    name = 'ModifyType1729777744569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Questions\` DROP COLUMN \`correctAnswerIndex\``);
        await queryRunner.query(`ALTER TABLE \`Questions\` ADD \`correctAnswerIndex\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Questions\` DROP COLUMN \`correctAnswerIndex\``);
        await queryRunner.query(`ALTER TABLE \`Questions\` ADD \`correctAnswerIndex\` varchar(255) NOT NULL`);
    }

}
