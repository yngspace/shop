import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilesController } from './files.controller'
import { FilesEntity } from '../entities/files.entity'
import { FilesService } from './files.service'
import { ProductsEntity } from 'src/entities/products.entity'
import { ProductsModule } from 'src/products/products.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([FilesEntity, ProductsEntity]),
    forwardRef(() => ProductsModule)
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService]
})
export class FilesModule {}
