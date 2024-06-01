import { Dish } from './dish.model';

export interface Category {
    categoryID: number;
    name: string;
    description: string;
    dish: Dish[];
  }
  