import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from 'src/guards/auth.guard'
import { ProductsCreatedDto, ProductsUpdatedDto } from './products.dto'
import { ProductsService } from './products.service'

@Controller('/api/products')
export class ProductsController {
  constructor(
    private readonly service: ProductsService
  ) {}

  @Get()
  getAll(@Query() q) {
    return this.service.getAll(q)
  }

  @Get(':id')
  getOne(@Param() p) {
    return this.service.getOne(p.id)
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() b: ProductsCreatedDto) {
    return this.service.create(b)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param() p, @Body() b: ProductsUpdatedDto) {
    return this.service.update(p.id, b)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param() p) {
    return this.service.delete(p.id)
  }
}
