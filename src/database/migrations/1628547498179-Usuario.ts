import {MigrationInterface, QueryRunner} from "typeorm";

export class Usuario1628547498179 implements MigrationInterface {
    name = 'Usuario1628547498179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "senha" varchar NOT NULL, "email" varchar NOT NULL, "telefone" varchar NOT NULL, "endereco" varchar, "tipo" integer NOT NULL, "tipo_doacao" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
