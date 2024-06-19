import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../../models/dish.model';
import { DishService } from '../../../../services/dish.service';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-admin-dishes',
  templateUrl: './admin-dishes.component.html',
  styleUrls: ['./admin-dishes.component.css']
})
export class AdminDishesComponent implements OnInit {
  dishes: Dish[] = [];
  categoryNames: { [key: number]: string } = {}; // Object to store category names by ID

  constructor(
    private dishService: DishService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.loadCategoryNames();
    });
  }

  private loadCategoryNames(): void {
    for (const dish of this.dishes) {
      if (!this.categoryNames[dish.CategoryID]) {
        // Only fetch category name if it hasn't been fetched before
        this.categoryService.getCategoryNameById(dish.CategoryID).subscribe(name => {
          this.categoryNames[dish.CategoryID] = name;
        });
      }
    }
  }
}
