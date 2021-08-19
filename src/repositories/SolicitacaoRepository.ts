import { EntityRepository, Repository } from "typeorm"
import { Solicitacao } from "../models/Solicitacao"

@EntityRepository(Solicitacao)
class SolicitacaoRepository extends Repository<Solicitacao> { }

export { SolicitacaoRepository }
