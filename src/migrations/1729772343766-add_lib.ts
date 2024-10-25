import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLib1729772343766 implements MigrationInterface {
  name = 'AddLib1729772343766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Libraries\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` varchar(36) NULL, \`createdByName\` varchar(50) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(36) NULL, \`deleteBy\` varchar(36) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(500) NOT NULL, \`ownerId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`Quizzes\` DROP COLUMN \`avatar\``);
    await queryRunner.query(
      `ALTER TABLE \`Quizzes\` ADD \`thumbnails\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Quizzes\` ADD \`libraryId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Quizzes\` ADD CONSTRAINT \`FK_9040f08ac20365d13882138a3d3\` FOREIGN KEY (\`libraryId\`) REFERENCES \`Libraries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Libraries\` ADD CONSTRAINT \`FK_d1e7f92013c9c6a7e1a33e7a45c\` FOREIGN KEY (\`ownerId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserDetails\` ADD CONSTRAINT \`FK_e60e37fdce8f5e2b289b621433f\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`UserDetails\` DROP FOREIGN KEY \`FK_e60e37fdce8f5e2b289b621433f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Libraries\` DROP FOREIGN KEY \`FK_d1e7f92013c9c6a7e1a33e7a45c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Quizzes\` DROP FOREIGN KEY \`FK_9040f08ac20365d13882138a3d3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Quizzes\` DROP COLUMN \`libraryId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Quizzes\` DROP COLUMN \`thumbnails\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Quizzes\` ADD \`avatar\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`Libraries\``);
  }
}
