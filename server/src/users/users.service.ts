import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto, GetUserDto, LoginUserDto } from './users.dto'
import { User } from './users.entity'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { thorwUnauthError } from 'src/const'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findUser(req): Promise<GetUserDto|HttpException> {
    const { id } = req.user

    const response = await this.usersRepository.findOne({ where: { id } })
    if (!response) thorwUnauthError()

    const user = new GetUserDto(response)
    return user
  }

  async login(body: LoginUserDto) {
    const { login, password } = body
    const user = await this.usersRepository.findOne({ where: { login } })

    if (!user) thorwUnauthError()

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'BAD_REQUEST',
        errors: { password: 'Не верный пароль' }
      }, HttpStatus.BAD_REQUEST)
    }

    return this.generateToken(user)
  }

  async registration(body: CreateUserDto) {
    const { password, login } = body

    const hashPassword = await bcrypt.hash(password, 6)
    body.password = hashPassword
    const newUser = await this.usersRepository.save(body)

    return this.generateToken(newUser)
  }

  async generateToken(user: User) {
    const payload = { id: user.id, login: user.login }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}