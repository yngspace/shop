import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import slugify from 'slugify'
import { CategoriesService } from 'src/categories/categories.service'
import { FiltersEntity } from 'src/entities/filters.entity'
import { throwHttpException } from 'src/pipes/validation.pipe'
import { Repository } from 'typeorm'
import { FiltersCreatedDto, FiltersQueryDto, FiltersUpdatedDto } from './filters.dto'

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(FiltersEntity)
    private readonly repository: Repository<FiltersEntity>,
    private readonly categoriesService: CategoriesService
  ) {}

  getAll(query: FiltersQueryDto) {
    if (query.categories) {
      return this.repository.find({ where: { categories: query.categories } })
    }

    return this.repository.find()
  }

  async getOne(id: string) {
    const result = await this.repository.findOne({ where: { id } })
    if (!result) throwHttpException(HttpStatus.NOT_FOUND, 'Не найдена категория')
    return result
  }

  async create(body: FiltersCreatedDto) {
    const { name, categories } = body
    const value = slugify(name.toLowerCase())
    if (body.categories && body.categories !== '') {
      await this.categoriesService.getBySlug(body.categories)
      const currentFilters = await this.repository.find({ where: { categories } })
      if (currentFilters.filter(x => x.value === value).length) {
        throwHttpException(HttpStatus.BAD_REQUEST, 'Фильтр с таким именем существует в категории')
      }
      return this.repository.save({ name, value, categories })
    }

    return this.repository.save({ name, value, categories })
  }

  async update(id: string, body: FiltersUpdatedDto) {
    const { name } = body
    const value = slugify(name.toLowerCase())
    if (body.categories) await this.categoriesService.getBySlug(body.categories)
    return this.repository.save({ ...body, value })
  }

  async delete(id: string) {
    const result = await this.getOne(id)
    await this.repository.delete(result)
    return {
      message: 'Удалено успешно'
    }
  }
}
