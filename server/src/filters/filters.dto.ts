import { IsNotEmpty, IsUUID } from 'class-validator'
import { IS_EMPTY } from 'src/const'

class FiltersCreatedDto {
  @IsNotEmpty({ message: IS_EMPTY })
  name: string

  @IsNotEmpty({ message: IS_EMPTY })
  categories: string
}

class FiltersUpdatedDto {
  @IsUUID()
  id: string

  @IsNotEmpty({ message: IS_EMPTY })
  name: string

  @IsNotEmpty({ message: IS_EMPTY })
  categories: string
}

class FiltersQueryDto {
  categories: string
}

export {
  FiltersCreatedDto,
  FiltersUpdatedDto,
  FiltersQueryDto
}
