import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm'
import { BaseInterfaceRepository } from './base.interface.repository'
import { FindAllResponse } from '../../types/common.type'

interface HasId {
  id: number
}

export abstract class BaseAbstractRepostitory<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>
  protected constructor(entity: Repository<T>) {
    this.entity = entity
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data)
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.entity.save(data)
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data)
  }

  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data)
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    }
    return await this.entity.findOneBy(options)
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(filterCondition)
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations)
  }

  public async findAll(
    options?: FindManyOptions<T>,
  ): Promise<FindAllResponse<T>> {
    const count = await this.entity.count(options)
    const items = await this.entity.find(options)
    return {
      count,
      items,
    }
  }

  public async remove(data: T): Promise<T> {
    return await this.entity.remove(data)
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike)
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(options)
  }
}
