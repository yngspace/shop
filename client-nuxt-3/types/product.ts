interface Photo {
  name: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  photos: Photo[]
}
