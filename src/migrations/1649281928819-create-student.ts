import { MigrationInterface, QueryRunner } from "typeorm";

export class createStudent1649281928819 implements MigrationInterface {
  name = "createStudent1649281928819";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_8ea82f272efa4678a78e4171394"`
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "networkId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "students" ADD "networkId" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_8ea82f272efa4678a78e4171394" FOREIGN KEY ("networkId") REFERENCES "networks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
