import { InjectRepository } from '@nestjs/typeorm'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { Users } from '../models/users.entity'
import { Repository } from 'typeorm'
import { UsersRepositoryInterface } from '../modules/users/interfaces/users.interface'

export class UsersRepository
  extends BaseAbstractRepostitory<Users>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {
    super(userRepository)
  }
}
