import { EntityRepository, Repository } from "typeorm"
import { Fila } from "../models/Fila"

@EntityRepository(Fila)
class FilaRepository extends Repository<Fila> { }

export { FilaRepository }
