import {MigrationInterface, QueryRunner} from "typeorm";

export class Fila1629940676746 implements MigrationInterface {
    name = 'Fila1629940676746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fila_doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data" varchar NOT NULL, "solicitacaoId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_fila_doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data" varchar NOT NULL, "solicitacaoId" integer NOT NULL, CONSTRAINT "FK_8c81d80e24f9cbe2fad3aec492a" FOREIGN KEY ("solicitacaoId") REFERENCES "solicitacoes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_fila_doacoes"("id", "data", "solicitacaoId") SELECT "id", "data", "solicitacaoId" FROM "fila_doacoes"`);
        await queryRunner.query(`DROP TABLE "fila_doacoes"`);
        await queryRunner.query(`ALTER TABLE "temporary_fila_doacoes" RENAME TO "fila_doacoes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fila_doacoes" RENAME TO "temporary_fila_doacoes"`);
        await queryRunner.query(`CREATE TABLE "fila_doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data" varchar NOT NULL, "solicitacaoId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "fila_doacoes"("id", "data", "solicitacaoId") SELECT "id", "data", "solicitacaoId" FROM "temporary_fila_doacoes"`);
        await queryRunner.query(`DROP TABLE "temporary_fila_doacoes"`);
        await queryRunner.query(`DROP TABLE "fila_doacoes"`);
    }

}
