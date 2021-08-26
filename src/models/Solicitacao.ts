import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Doacao } from "./Doacao";
import { Fila } from "./Fila";
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
    status: boolean;

    @Column()
    receptorId: number;

    @ManyToOne(() => Usuario, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "receptorId" })
    receptor: Usuario

    @Column({
        nullable: true
    })
    doacaoId: number;

    @ManyToOne(() => Doacao, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "doacaoId" })
    doacao: Doacao

    @OneToMany(() => Fila, (fila) => fila.solicitacao, {
        cascade: true,
    })
    fila?: Fila[]
}

export { Solicitacao };
