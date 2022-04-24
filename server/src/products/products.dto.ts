import { IsNotEmpty, IsUUID } from 'class-validator'
import { IS_EMPTY } from 'src/const'

class ProductsCreatedDto {
  @IsNotEmpty({ message: IS_EMPTY })
  name: string

  @IsNotEmpty({ message: IS_EMPTY })
  description: string

  @IsNotEmpty({ message: IS_EMPTY })
  price: number

  categories: string

  filters: string
}

class ProductsUpdatedDto {
  @IsUUID()
  id: string

  @IsNotEmpty({ message: IS_EMPTY })
  name: string

  @IsNotEmpty({ message: IS_EMPTY })
  description: string

  @IsNotEmpty({ message: IS_EMPTY })
  price: number

  categories: string

  filters: string
}

export {
  ProductsCreatedDto,
  ProductsUpdatedDto
}
