import { MigrationInterface, QueryRunner } from "typeorm";

export class createSchoolteachers1649971839825 implements MigrationInterface {
    name = 'createSchoolteachers1649971839825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teachers_schools_schools" ("teachersId" character varying NOT NULL, "schoolsId" character varying NOT NULL, CONSTRAINT "PK_74498ada4199c1aed6c32db51f2" PRIMARY KEY ("teachersId", "schoolsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9d38442622ad2014b1c4489c03" ON "teachers_schools_schools" ("teachersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_afb78d2410f3867b5b85b5c8f4" ON "teachers_schools_schools" ("schoolsId") `);
        await queryRunner.query(`ALTER TABLE "teachers_schools_schools" ADD CONSTRAINT "FK_9d38442622ad2014b1c4489c034" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teachers_schools_schools" ADD CONSTRAINT "FK_afb78d2410f3867b5b85b5c8f4c" FOREIGN KEY ("schoolsId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers_schools_schools" DROP CONSTRAINT "FK_afb78d2410f3867b5b85b5c8f4c"`);
        await queryRunner.query(`ALTER TABLE "teachers_schools_schools" DROP CONSTRAINT "FK_9d38442622ad2014b1c4489c034"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_afb78d2410f3867b5b85b5c8f4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d38442622ad2014b1c4489c03"`);
        await queryRunner.query(`DROP TABLE "teachers_schools_schools"`);
    }

}
