import { EntityRepository, Repository } from "typeorm"
import { Usuario } from "../models/Usuario"

@EntityRepository(Usuario)
class UserRepository extends Repository<Usuario> { }

export { UserRepository }
