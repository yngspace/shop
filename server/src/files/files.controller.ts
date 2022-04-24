import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
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

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10)
  )
  create(@UploadedFiles() files, @Body() b) {
    return this.service.create(files, b)
  }

  @Delete(':name')
  delete(@Param() p) {
    return this.service.delete(p.name)
  }
}
