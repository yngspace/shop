import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'
import { CreateUserDto, GetUserDto, LoginUserDto } from './users.dto'
import { UsersService } from './users.service'

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findUser(@Req() req): Promise<GetUserDto|HttpException> {
    return this.usersService.findUser(req)
  }

  @Post('/login')
  login(@Body() body: LoginUserDto) {
    return this.usersService.login(body)
  }

  @Post('/reg')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.registration(body)
  }
}
