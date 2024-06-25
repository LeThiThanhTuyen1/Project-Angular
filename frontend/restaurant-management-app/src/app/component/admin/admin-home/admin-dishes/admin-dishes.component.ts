import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../../models/dish.model';
import { DishService } from '../../../../services/dish.service';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';
import { NgForm } from '@angular/forms';  // Ensure NgForm is imported

@Component({
  selector: 'app-admin-dishes',
  templateUrl: './admin-dishes.component.html',
  styleUrls: ['./admin-dishes.component.css']
})
export class AdminDishesComponent implements OnInit {
  dishes: Dish[] = [];
  categoryNames: { [key: number]: string } = {};
  categories: Category[] = [];
  newDish: Dish = { DishID: 0, Name: '', Description: '', Price: 0, ImageURL: '', CategoryID: 0 };

  selectedDish!: Dish;
  selectedCategoryName: string = '';

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
        this.categoryService.getCategoryNameById(dish.CategoryID).subscribe(name => {
          this.categoryNames[dish.CategoryID] = name;
        });
      }
    }
  }

  setSelectedDish(dish: Dish): void {
    this.selectedDish = { ...dish };
    this.selectedCategoryName = this.categoryNames[dish.CategoryID];
  }

  onSubmit(): void {
    this.loadDish();
  }

  loadDish() {
    this.dishService.getAllDishes().subscribe({
      next: (data: Dish[]) => {
        this.dishes = data;
        console.log('Dishes loaded:', this.dishes);
      },
      error: (err) => {
        console.error('Failed to load dishes:', err);
      }
    });
  }

  addDish(form: NgForm) {
    if (form.valid) {
      this.newDish.Name = form.value.newName;
      this.newDish.Description = form.value.newDescription;
      this.newDish.Price = form.value.newPrice;
      this.newDish.ImageURL = form.value.newImageURL;
      this.newDish.CategoryID = form.value.newCategory;
      this.dishService.createDish(this.newDish).subscribe(
        dish => {
          console.log('Dish added:', dish);
          form.resetForm();
          (document.getElementById('id01')!).style.display = 'none';
          this.loadDish();
          alert('Thêm thành công.');
        },
        error => {
          alert('Món ăn đã tồn tại.');
          console.error('Failed to add dish:', error);
        }
      );
    }
  }
  openEditModal(dish : Dish) : void{
    this.selectedDish ={...dish};
    (document.getElementById('id02')!).style.display='block';
  }
  editDish(form: NgForm): void {
   
    }
  }

  
















