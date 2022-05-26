import { MigrationInterface, QueryRunner } from "typeorm";

export class changeRalationsDvdCart1653590199119 implements MigrationInterface {
    name = 'changeRalationsDvdCart1653590199119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "REL_9ed71a7c7e8e5e85c857bf7968"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "REL_9ed71a7c7e8e5e85c857bf7968" UNIQUE ("dvdId")`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
