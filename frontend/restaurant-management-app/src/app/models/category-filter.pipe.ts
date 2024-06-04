// category-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from './dish.model';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(items: Dish[], categoryId: number): Dish[] {
    if (!items) return [];
    return items.filter(item => item.CategoryID === categoryId);
  }
}
