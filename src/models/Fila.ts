import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Solicitacao } from "./Solicitacao";
import { Usuario } from "./Usuario";

@Entity("fila_doacoes")
class Fila {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: string;

    @Column()
    solicitacaoId: number;

    @ManyToOne(() => Solicitacao)
    @JoinColumn({ name: "solicitacaoId" })
    solicitacao: Usuario

    constructor(solicitacaoId: number) {
        this.solicitacaoId = solicitacaoId
        if (!this.data) {
            this.data = new Date().toLocaleString();
        }
    }
}

export { Fila };
