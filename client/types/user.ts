import { Entity, EntityMeta } from '.'

class User extends Entity {
  login: string = ''
  password: string = ''

  constructor(login?: string, password?: string) {
    super()
    if (login) this.login = login
    if (password) this.password = password
  }
}

class UserMeta extends EntityMeta<User> {
  endpoint: string = '/users/'
}

export {
  User,
  UserMeta
}
