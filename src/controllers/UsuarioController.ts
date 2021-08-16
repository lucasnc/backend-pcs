import { AppError } from '../models/AppError';
import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UsuarioRepository';
import { Usuario } from '../models/Usuario';
import AuthService from '../services/AuthService';

class UserController {

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const { cpf, senha } = request.body

            const auth = await AuthService.authenticate(cpf, senha)

            delete auth.usuario.senha

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

            delete auth.usuario.senha

            return response.status(200).json(auth)
        } catch (err) {
            next(err)
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = Number(request.params.id)
            const usersRepository = getCustomRepository(UserRepository);

            const user = await usersRepository.findOne(id);
            if (!user) {
                throw new AppError("Usuário não encontrado")
            }
            delete user.senha

            return response.json(user);
        } catch (err) {
            next(err)
        }
    }

    async deleteById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = Number(request.params.id)
            const usersRepository = getCustomRepository(UserRepository);

            const user = await usersRepository.findOne(id);
            if (!user) {
                throw new AppError("Usuário não encontrado")
            }
            await usersRepository.remove(user);

            return response.sendStatus(204);
        } catch (err) {
            next(err)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.body as Usuario;

            const userUpdate = await AuthService.update(user);
            delete userUpdate.senha

            return response.json(userUpdate);
        } catch (err) {
            next(err)
        }
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        try {
            return response.sendStatus(204);
        } catch (err) {
            next(err)
        }
    }
}

export { UserController };
