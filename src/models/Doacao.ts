import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("doacoes")
class Doacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo_doacao: string;

    @Column()
    data: Date;

    @Column()
    local: string;

    @Column()
    doadorId: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "doadorId" })
    doador: Usuario

    @Column({
        nullable: true
    })
    receptorId: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "receptorId" })
    receptor: Usuario

}

export { Doacao };
