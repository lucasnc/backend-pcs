import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
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

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "doadorId" })
    doador: Usuario

    @Column()
    quantidade_total: number;

    @Column()
    quantidade_restante: number;

}

export { Doacao };
