import { MigrationInterface, QueryRunner } from "typeorm";

export class createTeacherclass1650304029340 implements MigrationInterface {
    name = 'createTeacherclass1650304029340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "classes_teachers_teachers" ("classesId" character varying NOT NULL, "teachersId" character varying NOT NULL, CONSTRAINT "PK_5ae2c576c840c83efce88412295" PRIMARY KEY ("classesId", "teachersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0a90ab45b8e45263511ea95b54" ON "classes_teachers_teachers" ("classesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9a09210e3bf1f19897463553f" ON "classes_teachers_teachers" ("teachersId") `);
        await queryRunner.query(`ALTER TABLE "classes_teachers_teachers" ADD CONSTRAINT "FK_0a90ab45b8e45263511ea95b543" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classes_teachers_teachers" ADD CONSTRAINT "FK_b9a09210e3bf1f19897463553fb" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_teachers_teachers" DROP CONSTRAINT "FK_b9a09210e3bf1f19897463553fb"`);
        await queryRunner.query(`ALTER TABLE "classes_teachers_teachers" DROP CONSTRAINT "FK_0a90ab45b8e45263511ea95b543"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9a09210e3bf1f19897463553f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a90ab45b8e45263511ea95b54"`);
        await queryRunner.query(`DROP TABLE "classes_teachers_teachers"`);
    }

}
