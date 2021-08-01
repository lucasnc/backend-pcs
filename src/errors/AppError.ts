export class AppError {
    public readonly codigo: number;
    public readonly mensagem: string;

    constructor(mensagem: string, codigo = 400) {
        this.codigo = codigo;
        this.mensagem = mensagem;
    }
}
