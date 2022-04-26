import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { CategoriesEntity } from 'src/entities/categories.entity'
import { AuthGuard } from 'src/guards/auth.guard'
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

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() b: CategoriesCreatedDto): Promise<CategoriesEntity> {
    return this.service.create(b)
  }

  @UseGuards(AuthGuard)
  @Patch(':slug')
  update(@Param() p, @Body() b: CategoriesUpdatedDto): Promise<CategoriesEntity> {
    return this.service.update(p.slug, b)
  }

  @Get(':slug')
  getOne(@Param() p): Promise<CategoriesEntity> {
    return this.service.getBySlug(p.slug)
  }

  @UseGuards(AuthGuard)
  @Delete(':slug')
  delete(@Param() p): Promise<any> {
    return this.service.delete(p.slug)
  }
}
