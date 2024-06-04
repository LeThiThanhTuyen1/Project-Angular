import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { DishService } from '../../services/dish.service';

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

  constructor(public dishService: DishService) { }

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.groupDishes();
      this.getDishes();
    });
  }

  getDishes(): void {
    this.dishService.getAllDishes()
      .subscribe(dishes => {
        console.log(dishes); // Log dữ liệu ra console
        this.dishes = dishes;
      }, error => {
        console.error('Error fetching dishes:', error);
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
