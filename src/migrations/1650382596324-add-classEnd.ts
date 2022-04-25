import { MigrationInterface, QueryRunner } from "typeorm";

export class addClassEnd1650382596324 implements MigrationInterface {
    name = 'addClassEnd1650382596324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "classTime"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "classStart" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "classEnd" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "classDay"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "classDay" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "classDay"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "classDay" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "classEnd"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "classStart"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "classTime" character varying NOT NULL`);
    }

}
