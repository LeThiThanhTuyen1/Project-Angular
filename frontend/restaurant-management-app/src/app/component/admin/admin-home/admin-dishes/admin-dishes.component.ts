import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../../services/dish.service';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';
import { Dish } from '../../../../models/dish.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dishes',
  templateUrl: './admin-dishes.component.html',
  styleUrls: ['./admin-dishes.component.css']
})
export class AdminDishesComponent implements OnInit {
  dishes: Dish[] = [];
  categories: Category[] = [];
  categoryNames: { [key: number]: string } = {};
  selectedDish: Dish = {} as Dish;

  constructor(
    private dishService: DishService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories().subscribe(() => {
      this.loadDishes();
    });
  }

  private loadDishes(): void {
    this.dishService.getAllDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.loadCategoryNames();
    });
  }

  private loadCategories(): Observable<void> {
    return this.categoryService.getAllCategories().pipe(
      map((data: Category[]) => {
        this.categories = data;
        this.categories.forEach(category => {
          this.categoryNames[category.CategoryID] = category.Name;
        });
        console.log('Categories loaded:', this.categories); // Debugging log
      })
    );
  }

  private loadCategoryNames(): void {
    this.dishes.forEach(dish => {
      if (!this.categoryNames[dish.CategoryID]) {
        this.categoryService.getCategoryNameById(dish.CategoryID).subscribe(name => {
          this.categoryNames[dish.CategoryID] = name;
        });
      }
    });
  }

  setSelectedDish(dish: Dish): void {
    this.selectedDish = { ...dish };
    console.log('Selected Dish:', this.selectedDish); // Debugging log
    if (this.categories.length > 0) {
      document.getElementById('id02')!.style.display = 'block';
    } else {
      this.loadCategories().subscribe(() => {
        document.getElementById('id02')!.style.display = 'block';
      });
    }
  }

  updateDish(): void {
    this.dishService.updateDish(this.selectedDish.DishID, this.selectedDish).subscribe(updatedDish => {
      this.loadDishes();
      this.closeEditModal();
    });
  }

  closeEditModal(): void {
    document.getElementById('id02')!.style.display = 'none';
  }
}
