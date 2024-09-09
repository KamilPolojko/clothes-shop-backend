import { MigrationInterface, QueryRunner } from "typeorm";

export class ClientTable1725919539238 implements MigrationInterface {
    name = 'ClientTable1725919539238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" "public"."clients_gender_enum" NOT NULL DEFAULT 'OTHER', "dateOfBirth" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
