export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
