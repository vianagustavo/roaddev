import { MigrationInterface, QueryRunner } from "typeorm";

export class createClasses1649956597836 implements MigrationInterface {
  name = "createClasses1649956597836";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "classes" ("id" character varying NOT NULL, "schoolId" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "FK_17d36b6f6a79669ba76b671ac72" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "FK_17d36b6f6a79669ba76b671ac72"`
    );
    await queryRunner.query(`DROP TABLE "classes"`);
  }
}
