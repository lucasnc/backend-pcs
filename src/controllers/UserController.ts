import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { Usuario } from '../models/Usuario';
import AuthService from '../services/AuthService';

class UserController {

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const { cpf, senha } = request.body

            const auth = await AuthService.authenticate(cpf, senha)

            delete auth.user.senha

            return response.status(200).json(auth)
        } catch (err) {
            next(err)
        }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.body as Usuario

            const senha = user.senha

            const register = await AuthService.register(user)

            const auth = await AuthService.authenticate(register.cpf, senha)

            delete auth.user.senha

            return response.status(200).json(auth)
        } catch (err) {
            next(err)
        }
    }

    async getAll(request: Request, response: Response) {

        const usersRepository = getCustomRepository(UserRepository);

        const all = await usersRepository.find();

        return response.json(all);

    }
}

export { UserController };
