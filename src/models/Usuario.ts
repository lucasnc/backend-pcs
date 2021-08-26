import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Doacao } from "./Doacao";
import { Solicitacao } from "./Solicitacao";

@Entity("usuarios")
class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column()
    senha: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column({
        nullable: true
    })
    endereco: string;

    @Column()
    tipo: number;

    @OneToMany(() => Solicitacao, (solicitacao) => solicitacao.receptor, {
        cascade: true,
    })
    solicitacao?: Solicitacao[]

    @OneToMany(() => Doacao, (doacao) => doacao.doador, {
        cascade: true,
    })
    doacao?: Doacao[]
}

export { Usuario };
