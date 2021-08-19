import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Doacao } from "./Doacao";
import { Usuario } from "./Usuario";

@Entity("solicitacoes")
class Solicitacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo_doacao: string;

    @Column()
    data: string;

    @Column()
    status: number;

    @Column()
    receptorId: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "receptorId" })
    receptor: Usuario

    @Column({
        nullable: true
    })
    doacaoId: number;

    @ManyToOne(() => Doacao)
    @JoinColumn({ name: "doacaoId" })
    doacao: Doacao
}

export { Solicitacao };
