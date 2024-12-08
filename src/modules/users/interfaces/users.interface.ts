import { Users } from '../../../models/users.entity'
import { BaseAbstractRepostitory } from '../../../repositories/base/base.abstract.repository'

export interface UsersRepositoryInterface
  extends BaseAbstractRepostitory<Users> {}
