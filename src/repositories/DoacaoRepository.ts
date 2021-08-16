import { EntityRepository, Repository } from "typeorm"
import { Doacao } from "../models/Doacao"

@EntityRepository(Doacao)
class DoacaoRepository extends Repository<Doacao> { }

export { DoacaoRepository }
