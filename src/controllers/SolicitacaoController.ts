import { AppError } from './../models/AppError';
import { getCustomRepository, IsNull, MoreThan, Not } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Solicitacao } from '../models/Solicitacao';
import { SolicitacaoRepository } from '../repositories/SolicitacaoRepository';
import FilaService from '../services/FilaService';
import { Fila } from '../models/Fila';
import { DoacaoRepository } from '../repositories/DoacaoRepository';
import moment, { Moment } from "moment";



class SolicitacaoController {

    async store(request: Request, response: Response, next: NextFunction) {
        try {
            const solicitacao = request.body as Solicitacao

            const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);

            delete solicitacao.id
            await solicitacaoRepository.insert(solicitacao);

            if (solicitacao.id > 0) {
                let fila = new Fila(solicitacao.id);
                FilaService.push(fila);
            }

            return response.json(solicitacao);
        } catch (err) {
            next(err)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { id, tipo_doacao, status, doacaoId } = request.body as Solicitacao

            const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);

            let solicitacao = await solicitacaoRepository.findOne(id);

            if (!solicitacao) {
                throw new AppError("Solicitação não encontrada");
            }

            solicitacao.tipo_doacao = tipo_doacao;
            solicitacao.status = status;
            solicitacao.doacaoId = doacaoId;

            if (doacaoId && doacaoId > 0) {
                FilaService.pop(solicitacao.id);
            }

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

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);

            const solicitacoes = await solicitacaoRepository.find();

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

    async availability(request: Request, response: Response, next: NextFunction) {
        try {
            const id = Number(request.params.solicitacaoId)
            const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);
            const doacaoRepository = getCustomRepository(DoacaoRepository);

            const solicitacao = await solicitacaoRepository.findOne(id);
            if (!solicitacao) {
                throw new AppError("Solicitação não encontrada")
            }

            const solicitacoesReceptor = await solicitacaoRepository.find({
                where: { receptorId: solicitacao.receptorId, doacaoId: Not(IsNull()), status: true }
            });

            const now: Moment = moment()
            solicitacoesReceptor.find((s) => {
                let data: Moment = moment(s.data, 'DD-MM-YYYY').add(30, 'days')
                if (moment(moment(now)).isBefore(data)) {
                    throw new AppError("Só é possível receber 1 doação por mês")
                }
            })

            const fila = await FilaService.display();
            let indexFila = fila.findIndex(x => x !== undefined && x.solicitacaoId == solicitacao.id)
            console.log("index >>> ", indexFila)
            if (indexFila !== 0) {
                throw new AppError(`Não foi possível verificar as doações disponíveis. Sua posição na fila é ${indexFila + 1}`)
            }
            const doacoes = await doacaoRepository.find({
                where: { tipo_doacao: solicitacao.tipo_doacao, quantidade_restante: MoreThan(0) }
            })

            return response.json(doacoes);
        } catch (err) {
            next(err)
        }
    }


}

export { SolicitacaoController };
