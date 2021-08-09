import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    tipo_doacao: string;
}

export { Usuario };
