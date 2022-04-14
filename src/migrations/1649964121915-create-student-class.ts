import { MigrationInterface, QueryRunner } from "typeorm";

export class createStudentClass1649964121915 implements MigrationInterface {
    name = 'createStudentClass1649964121915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_students_students" DROP CONSTRAINT "FK_934c850b62cfa4f202c17d55e5e"`);
        await queryRunner.query(`ALTER TABLE "classes_students_students" ADD CONSTRAINT "FK_934c850b62cfa4f202c17d55e5e" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_students_students" DROP CONSTRAINT "FK_934c850b62cfa4f202c17d55e5e"`);
        await queryRunner.query(`ALTER TABLE "classes_students_students" ADD CONSTRAINT "FK_934c850b62cfa4f202c17d55e5e" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
