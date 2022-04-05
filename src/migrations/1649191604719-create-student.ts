import { MigrationInterface, QueryRunner } from "typeorm";

export class createStudent1649191604719 implements MigrationInterface {
  name = "createStudent1649191604719";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "students" ("id" character varying NOT NULL, "schoolId" character varying NOT NULL, "name" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "fatherName" character varying NOT NULL, "motherName" character varying NOT NULL, "enrollment" integer NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_44855579fce3690c57ae8b12999" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_44855579fce3690c57ae8b12999"`
    );
    await queryRunner.query(`DROP TABLE "students"`);
  }
}
