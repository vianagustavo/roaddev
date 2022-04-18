import { MigrationInterface, QueryRunner } from "typeorm";

export class createSchool1649188891102 implements MigrationInterface {
  name = "createSchool1649188891102";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schools" RENAME COLUMN "schoolId" TO "id"`
    );
    await queryRunner.query(
      `ALTER TABLE "schools" RENAME CONSTRAINT "PK_2701e2d1639869acc87f658f574" TO "PK_95b932e47ac129dd8e23a0db548"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schools" RENAME CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" TO "PK_2701e2d1639869acc87f658f574"`
    );
    await queryRunner.query(
      `ALTER TABLE "schools" RENAME COLUMN "id" TO "schoolId"`
    );
  }
}
