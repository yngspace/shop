import { IsEmail, IsNotEmpty, IsPhoneNumber, IsUUID } from 'class-validator'
import { IS_EMPTY } from 'src/const'

class SettingsCreatedDto {
  @IsPhoneNumber('RU')
  phone: string

  @IsEmail()
  email: string

  @IsNotEmpty({ message: IS_EMPTY })
  address: string

  @IsNotEmpty({ message: IS_EMPTY })
  workTime: string
}

class SettingsUpdatedDto {
  @IsPhoneNumber('RU')
  phone: string

  @IsEmail()
  email: string

  @IsNotEmpty({ message: IS_EMPTY })
  address: string

  @IsNotEmpty({ message: IS_EMPTY })
  workTime: string
}

export {
  SettingsCreatedDto,
  SettingsUpdatedDto
}
