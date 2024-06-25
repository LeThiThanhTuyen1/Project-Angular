import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../../services/dish.service';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';
import { Dish } from '../../../../models/dish.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

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
  newDish: Dish = { DishID: 0, Name: '', Description: '', Price: 0, ImageURL: '', CategoryID: 0 };

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

  addDish(form: NgForm) {
    if (form.valid) {
      this.newDish.Name = form.value.newName;
      this.newDish.Description = form.value.newDescription;
      this.newDish.Price = form.value.newPrice;
      this.newDish.ImageURL = form.value.newImageURL;
      this.newDish.CategoryID = form.value.newCategory;
      this.dishService.createDish(this.newDish).subscribe(
        dish => {
          form.resetForm();
          (document.getElementById('id01')!).style.display = 'none';
          this.loadDishes();
          alert('Thêm thành công.');
        },
        error => {
          alert('Món ăn đã tồn tại.');
          console.error('Failed to add dish:', error);
        }
      );
    }
  }

  openEditModal(dish: Dish): void {
    this.setSelectedDish(dish);
    (document.getElementById('id02')!).style.display = 'block';
  }

  editDish(form: NgForm): void {
    if (form.valid) {
      this.updateDish();
      form.resetForm();
      (document.getElementById('id02')!).style.display = 'none';
    }
  }

  deleteDish(dishId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa món ăn này không?')) {
      this.dishService.deleteDish(dishId).subscribe(
        () => {
          this.loadDishes();
          alert('Xóa thành công.');
        },
        error => {
          alert('Xóa thất bại.');
          console.error('Failed to delete dish:', error);
        }
      );
    }
  }
}
