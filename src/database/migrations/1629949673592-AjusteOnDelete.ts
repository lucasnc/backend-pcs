import {MigrationInterface, QueryRunner} from "typeorm";

export class AjusteOnDelete1629949673592 implements MigrationInterface {
    name = 'AjusteOnDelete1629949673592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_solicitacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" varchar NOT NULL, "status" integer NOT NULL, "receptorId" integer NOT NULL, "doacaoId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_solicitacoes"("id", "tipo_doacao", "data", "status", "receptorId", "doacaoId") SELECT "id", "tipo_doacao", "data", "status", "receptorId", "doacaoId" FROM "solicitacoes"`);
        await queryRunner.query(`DROP TABLE "solicitacoes"`);
        await queryRunner.query(`ALTER TABLE "temporary_solicitacoes" RENAME TO "solicitacoes"`);
        await queryRunner.query(`CREATE TABLE "temporary_doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" varchar NOT NULL, "local" varchar NOT NULL, "doadorId" integer NOT NULL, "quantidade_total" integer NOT NULL, "quantidade_restante" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_doacoes"("id", "tipo_doacao", "data", "local", "doadorId", "quantidade_total", "quantidade_restante") SELECT "id", "tipo_doacao", "data", "local", "doadorId", "quantidade_total", "quantidade_restante" FROM "doacoes"`);
        await queryRunner.query(`DROP TABLE "doacoes"`);
        await queryRunner.query(`ALTER TABLE "temporary_doacoes" RENAME TO "doacoes"`);
        await queryRunner.query(`CREATE TABLE "temporary_solicitacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" varchar NOT NULL, "status" integer NOT NULL, "receptorId" integer NOT NULL, "doacaoId" integer, CONSTRAINT "FK_852f51b4528837014c3c39ca722" FOREIGN KEY ("receptorId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_22aa63095fb491e967f338711d2" FOREIGN KEY ("doacaoId") REFERENCES "doacoes" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_solicitacoes"("id", "tipo_doacao", "data", "status", "receptorId", "doacaoId") SELECT "id", "tipo_doacao", "data", "status", "receptorId", "doacaoId" FROM "solicitacoes"`);
        await queryRunner.query(`DROP TABLE "solicitacoes"`);
        await queryRunner.query(`ALTER TABLE "temporary_solicitacoes" RENAME TO "solicitacoes"`);
        await queryRunner.query(`CREATE TABLE "temporary_doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" varchar NOT NULL, "local" varchar NOT NULL, "doadorId" integer NOT NULL, "quantidade_total" integer NOT NULL, "quantidade_restante" integer NOT NULL, CONSTRAINT "FK_0303f292ffcbcba9dd5ecd20f8c" FOREIGN KEY ("doadorId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_doacoes"("id", "tipo_doacao", "data", "local", "doadorId", "quantidade_total", "quantidade_restante") SELECT "id", "tipo_doacao", "data", "local", "doadorId", "quantidade_total", "quantidade_restante" FROM "doacoes"`);
        await queryRunner.query(`DROP TABLE "doacoes"`);
        await queryRunner.query(`ALTER TABLE "temporary_doacoes" RENAME TO "doacoes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doacoes" RENAME TO "temporary_doacoes"`);
        await queryRunner.query(`CREATE TABLE "doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" varchar NOT NULL, "local" varchar NOT NULL, "doadorId" integer NOT NULL, "quantidade_total" integer NOT NULL, "quantidade_restante" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "doacoes"("id", "tipo_doacao", "data", "local", "doadorId", "quantidade_total", "quantidade_restante") SELECT "id", "tipo_doacao", "data", "local", "doadorId", "quantidade_total", "quantidade_restante" FROM "temporary_doacoes"`);
        await queryRunner.query(`DROP TABLE "temporary_doacoes"`);
        await queryRunner.query(`ALTER TABLE "solicitacoes" RENAME TO "temporary_solicitacoes"`);
        await queryRunner.query(`CREATE TABLE "solicitacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" varchar NOT NULL, "status" integer NOT NULL, "receptorId" integer NOT NULL, "doacaoId" integer)`);
        await queryRunner.query(`INSERT INTO "solicitacoes"("id", "tipo_doacao", "data", "status", "receptorId", "doacaoId") SELECT "id", "tipo_doacao", "data", "status", "receptorId", "doacaoId" FROM "temporary_solicitacoes"`);
        await queryRunner.query(`DROP TABLE "temporary_solicitacoes"`);
        await queryRunner.query(`ALTER TABLE "doacoes" RENAME TO "temporary_doacoes"`);
        await queryRunner.query(`CREATE TABLE "doacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" varchar NOT NULL, "local" varchar NOT NULL, "doadorId" integer NOT NULL, "quantidade_total" integer NOT NULL, "quantidade_restante" integer NOT NULL, CONSTRAINT "FK_0303f292ffcbcba9dd5ecd20f8c" FOREIGN KEY ("doadorId") REFERENCES "usuarios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "doacoes"("id", "tipo_doacao", "data", "local", "doadorId", "quantidade_total", "quantidade_restante") SELECT "id", "tipo_doacao", "data", "local", "doadorId", "quantidade_total", "quantidade_restante" FROM "temporary_doacoes"`);
        await queryRunner.query(`DROP TABLE "temporary_doacoes"`);
        await queryRunner.query(`ALTER TABLE "solicitacoes" RENAME TO "temporary_solicitacoes"`);
        await queryRunner.query(`CREATE TABLE "solicitacoes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tipo_doacao" varchar NOT NULL, "data" varchar NOT NULL, "status" integer NOT NULL, "receptorId" integer NOT NULL, "doacaoId" integer, CONSTRAINT "FK_22aa63095fb491e967f338711d2" FOREIGN KEY ("doacaoId") REFERENCES "doacoes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_852f51b4528837014c3c39ca722" FOREIGN KEY ("receptorId") REFERENCES "usuarios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "solicitacoes"("id", "tipo_doacao", "data", "status", "receptorId", "doacaoId") SELECT "id", "tipo_doacao", "data", "status", "receptorId", "doacaoId" FROM "temporary_solicitacoes"`);
        await queryRunner.query(`DROP TABLE "temporary_solicitacoes"`);
    }

}
