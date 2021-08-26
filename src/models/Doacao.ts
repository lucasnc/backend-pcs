import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Solicitacao } from "./Solicitacao";
import { Usuario } from "./Usuario";

@Entity("doacoes")
class Doacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo_doacao: string;

    @Column()
    data: string;

    @Column()
    local: string;

    @Column()
    doadorId: number;

    @ManyToOne(() => Usuario, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "doadorId" })
    doador: Usuario

    @Column()
    quantidade_total: number;

    @Column()
    quantidade_restante: number;

    @OneToMany(() => Solicitacao, (solicitacao) => solicitacao.doacao, {
        cascade: true,
    })
    solicitacao?: Solicitacao[]

}

export { Doacao };
