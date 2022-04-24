import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FilesEntity } from '../entities/files.entity'
import * as uuid from 'uuid'
import * as path from 'path'
import * as fs from 'fs'
import { throwHttpException } from 'src/pipes/validation.pipe'
import { ProductsService } from 'src/products/products.service'

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesEntity)
    private readonly repository: Repository<FilesEntity>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService
  ) {}

  getAll() {
    return this.repository.find()
  }

  async create(files: any[], body: any) {
    if (!files.length) return
    try {
      const { products } = body
      if (products) await this.productsService.getOne(products)
      const result = []
      files.forEach(async (file) => {
        const array = file.originalname.split('.')
        const extension = array[array.length - 1]
        const newName = uuid.v4()
        const fileName = `${newName}.${extension}`
        const filePath = path.resolve(__dirname, '..', 'static')
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true })
        }
        fs.writeFileSync(path.join(filePath, fileName), file.buffer)
        await this.repository.save({ name: fileName, products })
          .then(x => result.push(x))
          .catch(() => fs.unlinkSync(filePath + '/' + fileName))
      })

      return result
    } catch (e) {
      throwHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Ошибка в обработке файла')
    }
  }

  async delete(name: string) {
    const filePath = path.resolve(__dirname, '..', 'static')
    fs.unlinkSync(filePath + '/' + name)
    await this.repository.delete(name)
    return {
      message: 'Удалено успешно'
    }
  }
}
