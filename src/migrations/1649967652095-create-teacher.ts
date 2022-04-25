import { MigrationInterface, QueryRunner } from "typeorm";

export class createTeacher1649967652095 implements MigrationInterface {
    name = 'createTeacher1649967652095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teachers" ("id" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "teachers"`);
    }

}
