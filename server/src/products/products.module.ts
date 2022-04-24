import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesModule } from 'src/categories/categories.module'
import { CategoriesEntity } from 'src/entities/categories.entity'
import { FilesEntity } from 'src/entities/files.entity'
import { FiltersEntity } from 'src/entities/filters.entity'
import { ProductsEntity } from 'src/entities/products.entity'
import { FilesModule } from 'src/files/files.module'
import { FiltersModule } from 'src/filters/filters.module'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, CategoriesEntity, FiltersEntity, FilesEntity]),
    CategoriesModule,
    FiltersModule,
    forwardRef(() => FilesModule)
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService]
})
export class ProductsModule {}
