import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesEntity } from 'src/entities/categories.entity'
import { FiltersEntity } from 'src/entities/filters.entity'
import { ProductsEntity } from 'src/entities/products.entity'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriesEntity, ProductsEntity, FiltersEntity])
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService]
})
export class CategoriesModule {}
