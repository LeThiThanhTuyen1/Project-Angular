import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../../models/dish.model';
import { DishService } from '../../../../services/dish.service';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model'; // Ensure you import Category model

@Component({
  selector: 'app-admin-dishes',
  templateUrl: './admin-dishes.component.html',
  styleUrls: ['./admin-dishes.component.css']
})
export class AdminDishesComponent implements OnInit {
  dishes: Dish[] = [];
  categoryNames: { [key: number]: string } = {}; // Object to store category names by ID
  categories: Category[] = []; // Array to store all categories

  // Variables to manage selected dish and category in modals
  selectedDish!: Dish; // Initialize an empty Dish object
  selectedCategoryName: string = ''; // For displaying selected category name in modals

  constructor(
    private dishService: DishService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.loadCategoryNames();
    });

    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
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

  // Method to set selected dish when editing
  setSelectedDish(dish: Dish): void {
    this.selectedDish = { ...dish }; // Using spread operator to create a copy
    this.selectedCategoryName = this.categoryNames[dish.CategoryID];
  }

  // Method to handle submission of add or edit form
  onSubmit(): void {
    // Logic to handle form submission, add or edit dish
    // Example:
    // if (this.selectedDish.DishID) {
    //   this.dishService.updateDish(this.selectedDish.DishID, this.selectedDish).subscribe(updatedDish => {
    //     // Handle success
    //   });
    // } else {
    //   this.dishService.createDish(this.selectedDish).subscribe(newDish => {
    //     // Handle success
    //   });
    // }
  }
}
