import { MigrationInterface, QueryRunner } from "typeorm";

export class addClassDate1650306977694 implements MigrationInterface {
    name = 'addClassDate1650306977694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" ADD "classDay" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "classTime" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "classTime"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "classDay"`);
    }

}
