export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  category: Category;
  stock: number;
  created_at: string;
}