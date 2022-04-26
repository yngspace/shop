import { IsNotEmpty, MinLength } from 'class-validator'
import { IS_EMPTY, MIN_LENGTH } from 'src/const'
import { User } from './users.entity'

export class CreateUserDto {
  @IsNotEmpty({ message: IS_EMPTY })
  @MinLength(4, { message: MIN_LENGTH + 4 })
  login: string

  @IsNotEmpty({ message: IS_EMPTY })
  @MinLength(4, { message: MIN_LENGTH + 4})
  password: string
}

export class LoginUserDto {
  @IsNotEmpty({ message: IS_EMPTY })
  @MinLength(4, { message: MIN_LENGTH + 4 })
  login: string

  @IsNotEmpty({ message: IS_EMPTY })
  @MinLength(4, { message: MIN_LENGTH + 4})
  password: string
}

export class GetUserDto {
  constructor(user: User) {
    this.login = user.login
  }

  login: string
}
