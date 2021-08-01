import {MigrationInterface, QueryRunner} from "typeorm";

export class Usuarios1627765954876 implements MigrationInterface {
    name = 'Usuarios1627765954876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "senha" varchar NOT NULL, "email" varchar NOT NULL, "telefone" varchar NOT NULL, "endereco" varchar NOT NULL, "tipo" integer NOT NULL, "prioridade_doacao" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
