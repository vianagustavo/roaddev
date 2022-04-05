import { MigrationInterface, QueryRunner } from "typeorm";

export class createNetwork1649190781500 implements MigrationInterface {
    name = 'createNetwork1649190781500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "networks" RENAME COLUMN "networkId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "networks" RENAME CONSTRAINT "PK_7348a7a6388b2a129f40aa8acb6" TO "PK_61b1ee921bf79550d9d4742b9f7"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "networks" RENAME CONSTRAINT "PK_61b1ee921bf79550d9d4742b9f7" TO "PK_7348a7a6388b2a129f40aa8acb6"`);
        await queryRunner.query(`ALTER TABLE "networks" RENAME COLUMN "id" TO "networkId"`);
    }

}
