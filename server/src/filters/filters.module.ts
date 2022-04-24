import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesModule } from 'src/categories/categories.module'
import { CategoriesEntity } from 'src/entities/categories.entity'
import { FiltersEntity } from 'src/entities/filters.entity'
import { ProductsEntity } from 'src/entities/products.entity'
import { FiltersController } from './filters.controller'
import { FiltersService } from './filters.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([FiltersEntity, CategoriesEntity, ProductsEntity]),
    CategoriesModule
  ],
  providers: [FiltersService],
  controllers: [FiltersController],
  exports: [FiltersService]
})
export class FiltersModule {}
