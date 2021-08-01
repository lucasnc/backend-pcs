import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { AppError } from './../errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { Usuario } from '../models/Usuario';

class AuthService {

    async authenticate(cpf: string, senha: string) {

        const usersRepository = getCustomRepository(UserRepository)

        const user = await usersRepository.findOne({
            where: { cpf }
        })

        if (!user) {
            throw new AppError("CPF não cadastrado")
        }

        const isValidPassword = await bcrypt.compare(senha, user.senha)

        if (!isValidPassword) {
            throw new AppError("CPF e/ou senha estão incorretas")
        }

        const token = jwt.sign({ id: user.id }, config.secretKey?.toString() || '', { expiresIn: '1d' })

        return { token, user }

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

        const registerUser = usersRepository.create(user)

        return await usersRepository.save(registerUser)
    }
}

export default new AuthService();
