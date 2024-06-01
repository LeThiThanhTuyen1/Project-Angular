import { Category } from './category.model';

export interface Dish {
    dishID: number;
    name: string;
    description: string;
    price: number;
    imageURL: string;
    categoryID: number;
    category: Category;
  }
  