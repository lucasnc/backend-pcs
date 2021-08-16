import {MigrationInterface, QueryRunner} from "typeorm";

export class Doacao1629064685131 implements MigrationInterface {
    name = 'Doacao1629064685131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" datetime NOT NULL, "local" varchar NOT NULL, "doadorId" integer NOT NULL, "receptorId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "senha" varchar NOT NULL, "email" varchar NOT NULL, "telefone" varchar NOT NULL, "endereco" varchar, "tipo" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_usuarios"("id", "nome", "cpf", "senha", "email", "telefone", "endereco", "tipo") SELECT "id", "nome", "cpf", "senha", "email", "telefone", "endereco", "tipo" FROM "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuarios" RENAME TO "usuarios"`);
        await queryRunner.query(`CREATE TABLE "temporary_doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" datetime NOT NULL, "local" varchar NOT NULL, "doadorId" integer NOT NULL, "receptorId" integer, CONSTRAINT "FK_0303f292ffcbcba9dd5ecd20f8c" FOREIGN KEY ("doadorId") REFERENCES "usuarios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a6d8da36ebeb10d1aaef5f60ccc" FOREIGN KEY ("receptorId") REFERENCES "usuarios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_doacoes"("id", "tipo_doacao", "data", "local", "doadorId", "receptorId") SELECT "id", "tipo_doacao", "data", "local", "doadorId", "receptorId" FROM "doacoes"`);
        await queryRunner.query(`DROP TABLE "doacoes"`);
        await queryRunner.query(`ALTER TABLE "temporary_doacoes" RENAME TO "doacoes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doacoes" RENAME TO "temporary_doacoes"`);
        await queryRunner.query(`CREATE TABLE "doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" datetime NOT NULL, "local" varchar NOT NULL, "doadorId" integer NOT NULL, "receptorId" integer)`);
        await queryRunner.query(`INSERT INTO "doacoes"("id", "tipo_doacao", "data", "local", "doadorId", "receptorId") SELECT "id", "tipo_doacao", "data", "local", "doadorId", "receptorId" FROM "temporary_doacoes"`);
        await queryRunner.query(`DROP TABLE "temporary_doacoes"`);
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME TO "temporary_usuarios"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "senha" varchar NOT NULL, "email" varchar NOT NULL, "telefone" varchar NOT NULL, "endereco" varchar, "tipo" integer NOT NULL, "tipo_doacao" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "usuarios"("id", "nome", "cpf", "senha", "email", "telefone", "endereco", "tipo") SELECT "id", "nome", "cpf", "senha", "email", "telefone", "endereco", "tipo" FROM "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "doacoes"`);
    }

}
