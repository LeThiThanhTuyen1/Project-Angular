import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { DishService } from '../../services/dish.service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})
export class DishListComponent implements OnInit{
  
  sushiGroups: Dish[][] = [];
  sideDishGroups: Dish[][] = [];
  drinkGroups: Dish[][] = [];
  dishes: Dish[] = [];
  categories: Category[] = [];

  constructor(public dishService: DishService, 
              public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.groupDishes();
    });
    this.categoryService.getAllCategories()
      .subscribe((category: Category[]) => {
      this.categories = category;
    });
    
  }

  groupDishes(): void {
    const sushi = this.dishes.filter(dish => dish.CategoryID === 1);
    const sideDishes = this.dishes.filter(dish => dish.CategoryID === 3);
    const drinks = this.dishes.filter(dish => dish.CategoryID === 2);

    this.sushiGroups = this.chunk(sushi, 4);
    this.sideDishGroups = this.chunk(sideDishes, 4);
    this.drinkGroups = this.chunk(drinks, 4);
  }

  chunk(arr: Dish[], size: number): Dish[][] {
    const result: Dish[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

}
