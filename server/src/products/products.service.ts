import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoriesService } from 'src/categories/categories.service'
import { ProductsEntity } from 'src/entities/products.entity'
import { FilesService } from 'src/files/files.service'
import { FiltersService } from 'src/filters/filters.service'
import { throwHttpException } from 'src/pipes/validation.pipe'
import { Repository } from 'typeorm'
import { ProductsCreatedDto, ProductsUpdatedDto } from './products.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly repository: Repository<ProductsEntity>,
    private readonly categoriesService: CategoriesService,
    private readonly filtersService: FiltersService,
    @Inject(forwardRef(() => FilesService))
    private readonly filesService: FilesService
  ) {}

  async queryBuilder(query): Promise<{ [code: string]: string }> {
    const { categories, type } = query
    if (type && !categories) throwHttpException(HttpStatus.BAD_REQUEST, 'Не указана категория')

    const params: { [code: string]: string } = {}

    if (categories) params.categories = categories
    if (type) {
      const currentFilter = (await this.filtersService.getAll(categories)
      ).filter(item => item.value === type)

      if (!currentFilter.length) throwHttpException(HttpStatus.NOT_FOUND, 'Не найдено')
      const { id } = currentFilter[0]
      params.filters = id
    }

    return params
  }

  async getAll(query): Promise<any> {
    const params = await this.queryBuilder(query)
    const page = parseInt(query.page) || 1
    const perPage = parseInt(query.perPage) || 9
    const [result, count] = await this.repository.findAndCount({
      take: perPage,
      skip: page === 1 ? 0 : (page - 1) * perPage,
      where: params,
    })

    return {
      count,
      next: count > (page * perPage),
      prev: page !== 1 ? true : false,
      page,
      result
    }
  }

  async getOne(id: string): Promise<ProductsEntity> {
    const result = await this.repository.findOne({ where: { id } })
    if (!result) throwHttpException(HttpStatus.BAD_REQUEST, 'Не найдено')
    return result
  }

  async create(body: ProductsCreatedDto, files) {
    if (body.categories && body.categories !== '') {
      await this.categoriesService.getBySlug(body.categories)
    }
    if (body.filters && body.filters !== '') {
      await this.filtersService.getOne(body.filters)
    }

    const result = await this.repository.save(body)
    await this.filesService.create(files, { products: result.id })
    return result
  }

  async update(id: string, body: ProductsUpdatedDto, files): Promise<ProductsEntity> {
    const result = await this.getOne(id)
    await this.filesService.create(files, { products: result.id })
    if (result.categories !== body.categories && body.categories !== null) {
      await this.categoriesService.getBySlug(body.categories)
    }
    if (result.filters !== body.filters && body.filters !== null) {
      await this.filtersService.getOne(body.filters)
    }

    return this.repository.save(body)
  }

  async delete(id: string): Promise<any> {
    const result = await this.getOne(id)
    await this.repository.delete(result)
    return {
      meessage: 'Удалено успешно'
    }
  }
}
