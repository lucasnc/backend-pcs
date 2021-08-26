import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../models/AppError';
import { getCustomRepository, Not } from 'typeorm';
import { UserRepository } from '../repositories/UsuarioRepository';
import { Usuario } from '../models/Usuario';
import { notEqual } from 'assert';

class AuthService {

    async authenticate(cpf: string, senha: string) {

        const usersRepository = getCustomRepository(UserRepository)

        const usuario = await usersRepository.findOne({
            where: { cpf }
        })

        if (!usuario) {
            throw new AppError("CPF não cadastrado")
        }

        const isValidPassword = await bcrypt.compare(senha, usuario.senha)

        if (!isValidPassword) {
            throw new AppError("CPF e/ou senha estão incorretas")
        }

        const token = jwt.sign({ id: usuario.id }, config.secretKey?.toString() || '', { expiresIn: '1d' })

        return { token, usuario }

    }

    async register(user: Usuario) {

        const usersRepository = getCustomRepository(UserRepository)

        const userAlreadyExists = await usersRepository.findOne({
            where: { cpf: user.cpf }
        })

        if (userAlreadyExists) {
            throw new AppError("CPF já cadastrado")
        }

        user.senha = bcrypt.hashSync(user.senha, 10)
        delete user.id
        const registerUser = usersRepository.create(user)

        return await usersRepository.save(registerUser)
    }

    async update(user: Usuario) {
        const usersRepository = getCustomRepository(UserRepository);

        const result = await usersRepository.findOne(user.id);
        if (!result) {
            throw new AppError("Usuário não encontrado");
        }

        const userAlreadyExists = await usersRepository.findOne({
            where: { cpf: user.cpf, id: Not(user.id) }
        })
        if (userAlreadyExists) {
            throw new AppError("CPF já cadastrado")
        }

        if (user.senha)
            user.senha = bcrypt.hashSync(user.senha, 10)
        else
            user.senha = result.senha


        return await usersRepository.save(user)

    }
}

export default new AuthService();
