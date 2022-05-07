import { MigrationInterface, QueryRunner } from "typeorm";

export class changeEnrollmentType1651636833559 implements MigrationInterface {
    name = 'changeEnrollmentType1651636833559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "enrollment"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "enrollment" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "enrollment"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "enrollment" integer NOT NULL`);
    }

}
