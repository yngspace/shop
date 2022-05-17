import { Entity, EntityMeta } from '.'

class Meta extends Entity {
  id: string = ''
  phone: string = ''
  workTime: string = ''
  email: string = ''
  address: string = ''
}

class MetaMeta extends EntityMeta<Meta> {
  endpoint: string = '/settings/'
}

export {
  Meta,
  MetaMeta
}
