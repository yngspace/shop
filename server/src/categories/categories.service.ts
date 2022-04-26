import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import slugify from 'slugify'
import { CategoriesEntity } from 'src/entities/categories.entity'
import { throwHttpException } from 'src/pipes/validation.pipe'
import { Repository } from 'typeorm'
import { CategoriesCreatedDto, CategoriesUpdatedDto } from './categories.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly repository: Repository<CategoriesEntity>
  ) {}

  getAll(query): Promise<CategoriesEntity[]> {
    const { active, admin } = query
    if (active === 'true' || active === 'false') {
      return this.repository.find({ where: { active } })
    }
    if (admin) return this.repository.find({ relations: ['filters'] })

    return this.repository.find()
  }

  async create(body: CategoriesCreatedDto): Promise<CategoriesEntity> {
    const { name } = body
    const slug = slugify(name.toLowerCase())
    const check = await this.repository.findOne({ where: { slug } })
    if (check) throwHttpException(HttpStatus.BAD_REQUEST, 'Категория с указанным slug уже существует')
    return await this.repository.save({ ...body, slug })
  }

  async getBySlug(slug: string): Promise<CategoriesEntity> {
    const result = await this.repository.findOne({ where: { slug } })
    if (!result) throwHttpException(HttpStatus.NOT_FOUND, 'Категория с указанным slug не найдена')
    return result
  }

  async update(slug: string, body: CategoriesUpdatedDto): Promise<CategoriesEntity> {
    const currentItem = await this.repository.findOne({ where: { slug } })

    if (!currentItem) {
      throwHttpException(HttpStatus.BAD_REQUEST, 'Категория с указанным slug не найдена')
    }

    const { name } = body

    if (name !== currentItem.name) {
      const newSlug = slugify(name.toLowerCase())
      const check = await this.repository.findOne({ where: { slug: newSlug } })
      if (check) throwHttpException(HttpStatus.BAD_REQUEST, 'Категория с указанным slug уже существует')
      return this.repository.save({ ...body, slug: newSlug })
    }

    return this.repository.save(body)
  }

  async delete(slug: string): Promise<any> {
    const result = await this.getBySlug(slug)
    await this.repository.delete(result)
    return {
      message: 'Удалено успешно'
    }
  }
}
