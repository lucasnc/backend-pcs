import { AppError } from './../models/AppError';
import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { DoacaoRepository } from '../repositories/DoacaoRepository';
import { Doacao } from '../models/Doacao';


class DoacaoController {

    async store(request: Request, response: Response, next: NextFunction) {
        try {
            const doacao = request.body as Doacao

            const doacaoRepository = getCustomRepository(DoacaoRepository);

            delete doacao.id
            await doacaoRepository.insert(doacao);

            return response.json(doacao);
        } catch (err) {
            next(err)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const doacao = request.body as Doacao

            const doacaoRepository = getCustomRepository(DoacaoRepository);

            const result = await doacaoRepository.findOne(doacao.id);

            if (!result) {
                throw new AppError("Doação não encontrada");
            }

            const doacaoSaved = await doacaoRepository.save(doacao);

            return response.json(doacaoSaved);
        } catch (err) {
            next(err)
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = Number(request.params.id)

            const doacaoRepository = getCustomRepository(DoacaoRepository);

            const doacao = await doacaoRepository.findOne(id);

            if (!doacao) {
                throw new AppError("Doação não encontrada");
            }

            return response.json(doacao);
        } catch (err) {
            next(err)
        }
    }

    async getDoacoesByUserId(request: Request, response: Response, next: NextFunction) {
        try {
            const id = Number(request.params.userId)
            const doacaoRepository = getCustomRepository(DoacaoRepository);

            const doacoes = await doacaoRepository.find({
                where: { doadorId: id }
            });

            return response.json(doacoes);
        } catch (err) {
            next(err)
        }
    }

    async deleteById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = Number(request.params.id)
            const doacaoRepository = getCustomRepository(DoacaoRepository);

            const doacao = await doacaoRepository.findOne(id);
            if (!doacao) {
                throw new AppError("Usuário não encontrado")
            }
            await doacaoRepository.remove(doacao);

            return response.sendStatus(204);
        } catch (err) {
            next(err)
        }
    }


}

export { DoacaoController };
