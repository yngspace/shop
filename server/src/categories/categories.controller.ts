import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CategoriesEntity } from 'src/entities/categories.entity'
import { CategoriesCreatedDto, CategoriesQueryDto, CategoriesUpdatedDto } from './categories.dto'
import { CategoriesService } from './categories.service'

@Controller('/api/categories')
export class CategoriesController {
  constructor(
    private readonly service: CategoriesService
  ) {}

  @Get()
  getAll(@Query() q: CategoriesQueryDto): Promise<CategoriesEntity[]> {
    return this.service.getAll(q)
  }

  @Post()
  create(@Body() b: CategoriesCreatedDto): Promise<CategoriesEntity> {
    return this.service.create(b)
  }

  @Patch(':slug')
  update(@Param() p, @Body() b: CategoriesUpdatedDto): Promise<CategoriesEntity> {
    return this.service.update(p.slug, b)
  }

  @Get(':slug')
  getOne(@Param() p): Promise<CategoriesEntity> {
    return this.service.getBySlug(p.slug)
  }

  @Delete(':slug')
  delete(@Param() p): Promise<any> {
    return this.service.delete(p.slug)
  }
}
