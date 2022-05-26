import { MigrationInterface, QueryRunner } from "typeorm";

export class fixingTableStock1653575742580 implements MigrationInterface {
    name = 'fixingTableStock1653575742580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "UQ_a8f6b8d93159d15f95a1fbf0b8d"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "UQ_a8f6b8d93159d15f95a1fbf0b8d" UNIQUE ("price")`);
    }

}
