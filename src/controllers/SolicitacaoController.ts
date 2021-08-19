import { AppError } from './../models/AppError';
import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Solicitacao } from '../models/Solicitacao';
import { SolicitacaoRepository } from '../repositories/SolicitacaoRepository';

class SolicitacaoController {

    async store(request: Request, response: Response, next: NextFunction) {
        try {
            const solicitacao = request.body as Solicitacao

            const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);

            delete solicitacao.id
            await solicitacaoRepository.insert(solicitacao);

            return response.json(solicitacao);
        } catch (err) {
            next(err)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { id, tipo_doacao } = request.body as Solicitacao

            const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);

            let solicitacao = await solicitacaoRepository.findOne(id);

            if (!solicitacao) {
                throw new AppError("Solicitação não encontrada");
            }

            solicitacao.tipo_doacao = tipo_doacao;
            solicitacao.data = new Date().toLocaleString()

            await solicitacaoRepository.save(solicitacao);

            return response.json(solicitacao);
        } catch (err) {
            next(err)
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = Number(request.params.id)

            const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);

            const solicitacao = await solicitacaoRepository.findOne(id);

            if (!solicitacao) {
                throw new AppError("Solicitação não encontrada");
            }

            return response.json(solicitacao);
        } catch (err) {
            next(err)
        }
    }

    async getSolicitacoesByUserId(request: Request, response: Response, next: NextFunction) {
        try {
            const id = Number(request.params.userId)
            const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);

            const solicitacoes = await solicitacaoRepository.find({
                where: { receptorId: id }
            });

            return response.json(solicitacoes);
        } catch (err) {
            next(err)
        }
    }

    async deleteById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = Number(request.params.id)
            const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);

            const solicitacao = await solicitacaoRepository.findOne(id);
            if (!solicitacao) {
                throw new AppError("Solicitação não encontrado")
            }
            await solicitacaoRepository.remove(solicitacao);

            return response.sendStatus(204);
        } catch (err) {
            next(err)
        }
    }


}

export { SolicitacaoController };
