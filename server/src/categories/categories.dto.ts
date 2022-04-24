import { IsBoolean, IsNotEmpty } from 'class-validator'
import { IS_EMPTY } from 'src/const'

class CategoriesCreatedDto {
  @IsNotEmpty({ message: IS_EMPTY })
  name: string
}

class CategoriesUpdatedDto {
  @IsNotEmpty({ message: IS_EMPTY })
  slug: string

  @IsNotEmpty({ message: IS_EMPTY })
  name: string

  @IsBoolean()
  active: boolean
}

class CategoriesQueryDto {
  active: boolean
}

export {
  CategoriesCreatedDto,
  CategoriesUpdatedDto,
  CategoriesQueryDto
}
