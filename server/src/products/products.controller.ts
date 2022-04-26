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
  @UseInterceptors(
    FilesInterceptor('files', 10)
  )
  create(@Body() b: ProductsCreatedDto, @UploadedFiles() files) {
    return this.service.create(b, files)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10)
  )
  update(@Param() p, @Body() b: ProductsUpdatedDto, @UploadedFiles() files) {
    return this.service.update(p.id, b, files)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param() p) {
    return this.service.delete(p.id)
  }
}
