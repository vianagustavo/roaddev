import { MigrationInterface, QueryRunner } from "typeorm";

export class createStudent1649871160038 implements MigrationInterface {
  name = "createStudent1649871160038";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "birthDate"`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD "birthDate" TIMESTAMP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "birthDate"`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD "birthDate" character varying NOT NULL`
    );
  }
}
