import { getCustomRepository } from 'typeorm';
import { Fila } from '../models/Fila';
import { FilaRepository } from "../repositories/FilaRepository";


class FilaService {

    async pop(id: number) {

        const filaRepository = getCustomRepository(FilaRepository);

        const item = await filaRepository.findOne({
            where: { solicitacaoId: id }
        });

        if (item) {
            await filaRepository.remove(item);
        }
    }

    async push(item: Fila) {

        const filaRepository = getCustomRepository(FilaRepository);

        delete item.id
        await filaRepository.insert(item);

    }

    async display() {

        const filaRepository = getCustomRepository(FilaRepository);
        return await filaRepository.find({
            order: { id: 'ASC' }
        });

    }

}

export default new FilaService();
