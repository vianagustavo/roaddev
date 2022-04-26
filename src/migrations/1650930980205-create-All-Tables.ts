import { MigrationInterface, QueryRunner } from "typeorm";

export class createAllTables1650930980205 implements MigrationInterface {
    name = 'createAllTables1650930980205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "networks" ("id" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_61b1ee921bf79550d9d4742b9f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schools" ("id" character varying NOT NULL, "networkId" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" character varying NOT NULL, "schoolId" character varying NOT NULL, "name" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "fatherName" character varying NOT NULL, "motherName" character varying NOT NULL, "enrollment" integer NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes" ("id" character varying NOT NULL, "schoolId" character varying NOT NULL, "classDay" integer NOT NULL, "classStart" character varying NOT NULL, "classEnd" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers_schools_schools" ("teachersId" character varying NOT NULL, "schoolsId" character varying NOT NULL, CONSTRAINT "PK_74498ada4199c1aed6c32db51f2" PRIMARY KEY ("teachersId", "schoolsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9d38442622ad2014b1c4489c03" ON "teachers_schools_schools" ("teachersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_afb78d2410f3867b5b85b5c8f4" ON "teachers_schools_schools" ("schoolsId") `);
        await queryRunner.query(`CREATE TABLE "classes_students_students" ("classesId" character varying NOT NULL, "studentsId" character varying NOT NULL, CONSTRAINT "PK_44e7ec4f9fe28191e1c044dd198" PRIMARY KEY ("classesId", "studentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d96b611e61c20a152a99d62cdb" ON "classes_students_students" ("classesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_934c850b62cfa4f202c17d55e5" ON "classes_students_students" ("studentsId") `);
        await queryRunner.query(`CREATE TABLE "classes_teachers_teachers" ("classesId" character varying NOT NULL, "teachersId" character varying NOT NULL, CONSTRAINT "PK_5ae2c576c840c83efce88412295" PRIMARY KEY ("classesId", "teachersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0a90ab45b8e45263511ea95b54" ON "classes_teachers_teachers" ("classesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9a09210e3bf1f19897463553f" ON "classes_teachers_teachers" ("teachersId") `);
        await queryRunner.query(`ALTER TABLE "schools" ADD CONSTRAINT "FK_4cc03b4feef0f97ba952fcf38dd" FOREIGN KEY ("networkId") REFERENCES "networks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_44855579fce3690c57ae8b12999" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_17d36b6f6a79669ba76b671ac72" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers_schools_schools" ADD CONSTRAINT "FK_9d38442622ad2014b1c4489c034" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teachers_schools_schools" ADD CONSTRAINT "FK_afb78d2410f3867b5b85b5c8f4c" FOREIGN KEY ("schoolsId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes_students_students" ADD CONSTRAINT "FK_d96b611e61c20a152a99d62cdbf" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classes_students_students" ADD CONSTRAINT "FK_934c850b62cfa4f202c17d55e5e" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes_teachers_teachers" ADD CONSTRAINT "FK_0a90ab45b8e45263511ea95b543" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classes_teachers_teachers" ADD CONSTRAINT "FK_b9a09210e3bf1f19897463553fb" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_teachers_teachers" DROP CONSTRAINT "FK_b9a09210e3bf1f19897463553fb"`);
        await queryRunner.query(`ALTER TABLE "classes_teachers_teachers" DROP CONSTRAINT "FK_0a90ab45b8e45263511ea95b543"`);
        await queryRunner.query(`ALTER TABLE "classes_students_students" DROP CONSTRAINT "FK_934c850b62cfa4f202c17d55e5e"`);
        await queryRunner.query(`ALTER TABLE "classes_students_students" DROP CONSTRAINT "FK_d96b611e61c20a152a99d62cdbf"`);
        await queryRunner.query(`ALTER TABLE "teachers_schools_schools" DROP CONSTRAINT "FK_afb78d2410f3867b5b85b5c8f4c"`);
        await queryRunner.query(`ALTER TABLE "teachers_schools_schools" DROP CONSTRAINT "FK_9d38442622ad2014b1c4489c034"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_17d36b6f6a79669ba76b671ac72"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_44855579fce3690c57ae8b12999"`);
        await queryRunner.query(`ALTER TABLE "schools" DROP CONSTRAINT "FK_4cc03b4feef0f97ba952fcf38dd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9a09210e3bf1f19897463553f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a90ab45b8e45263511ea95b54"`);
        await queryRunner.query(`DROP TABLE "classes_teachers_teachers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_934c850b62cfa4f202c17d55e5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d96b611e61c20a152a99d62cdb"`);
        await queryRunner.query(`DROP TABLE "classes_students_students"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_afb78d2410f3867b5b85b5c8f4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d38442622ad2014b1c4489c03"`);
        await queryRunner.query(`DROP TABLE "teachers_schools_schools"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "schools"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "networks"`);
    }

}
