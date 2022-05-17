import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'

@Controller('/api/files')
export class FilesController {
  constructor(
    private readonly service: FilesService
  ) {}

  @Get()
  getAll() {
    return this.service.getAll()
  }

  @Get(':id')
  getOne(@Param() p) {
    return this.service.getByPk(p.id)
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file')
  )
  create(@UploadedFile() file) {
    return this.service.create(file)
  }

  @Delete(':name')
  delete(@Param() p) {
    return this.service.delete(p.name)
  }
}
