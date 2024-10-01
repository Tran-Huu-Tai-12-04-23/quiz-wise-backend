import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1727762244361 implements MigrationInterface {
  name = 'Init1727762244361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Users\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` varchar(36) NULL, \`createdByName\` varchar(50) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(36) NULL, \`deleteBy\` varchar(36) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`username\` varchar(500) NOT NULL, \`password\` varchar(500) NOT NULL, \`avatar\` varchar(255) NOT NULL, \`verifyAt\` datetime NOT NULL, \`isActive\` tinyint NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'MEMBER', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`UserDetails\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` varchar(36) NULL, \`createdByName\` varchar(50) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(36) NULL, \`deleteBy\` varchar(36) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`fullName\` varchar(500) NOT NULL, \`address\` varchar(500) NOT NULL, \`phoneNumber\` varchar(500) NOT NULL, \`email\` varchar(500) NOT NULL, \`githubLink\` varchar(500) NOT NULL, \`telegramLink\` varchar(500) NOT NULL, \`facebookLink\` varchar(500) NOT NULL, \`bio\` varchar(500) NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_e60e37fdce8f5e2b289b621433\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`UserAnswerHistory\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` varchar(36) NULL, \`createdByName\` varchar(50) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(36) NULL, \`deleteBy\` varchar(36) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(500) NOT NULL, \`description\` varchar(500) NOT NULL, \`avatar\` varchar(255) NOT NULL, \`questionId\` varchar(255) NOT NULL, \`quizId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Quizzes\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` varchar(36) NULL, \`createdByName\` varchar(50) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(36) NULL, \`deleteBy\` varchar(36) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(500) NOT NULL, \`description\` varchar(500) NOT NULL, \`avatar\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Questions\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` varchar(36) NULL, \`createdByName\` varchar(50) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(36) NULL, \`deleteBy\` varchar(36) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(500) NOT NULL, \`options\` varchar(500) NOT NULL, \`correctAnswerIndex\` varchar(255) NOT NULL, \`quizId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Questions\` ADD CONSTRAINT \`FK_102f5ff17d80a5e4bec76cc9833\` FOREIGN KEY (\`quizId\`) REFERENCES \`Quizzes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Questions\` DROP FOREIGN KEY \`FK_102f5ff17d80a5e4bec76cc9833\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserDetails\` DROP FOREIGN KEY \`FK_e60e37fdce8f5e2b289b621433f\``,
    );
    await queryRunner.query(`DROP TABLE \`Questions\``);
    await queryRunner.query(`DROP TABLE \`Quizzes\``);
    await queryRunner.query(`DROP TABLE \`UserAnswerHistory\``);

    await queryRunner.query(`DROP TABLE \`UserDetails\``);
    await queryRunner.query(`DROP TABLE \`Users\``);
  }
}
