class Entity {}

class EntityMeta<T> {
  endpoint = ''
  entity = Entity

  static load (data: any) {
    const meta = new this()
    return meta.load(data)
  }

  static dump (item: T): any {
    const meta = new this()
    return meta.dump(item)
  }

  getInstance () {
    return new this.entity()
  }

  load (data: any): T {
    const result = new this.entity() as { [code: string] : any }
    Object.keys(result).forEach(key => result[key] = data[key])
    return data
  }

  dump (item: T): any {
    return item
  }
}


class PaginationType<T extends Entity> {
  result: T[] = []
  count: number = 0
  page: number = 0
  next: boolean = false
  prev: boolean = false
  totalPages: number = 1
  perPage: number = 0

  constructor(data?: PaginationType<T>, meta?: EntityMeta<T>) {
    if (!data) return

    this.result = meta ? data.result.map(item => meta.load(item)) : data.result
    this.count = data.count
    this.page = data.page
    this.next = data.next
    this.prev = data.prev
    this.totalPages = Math.ceil(data.count / data.perPage)
  }
}

export {
  Entity,
  EntityMeta,
  PaginationType
}
