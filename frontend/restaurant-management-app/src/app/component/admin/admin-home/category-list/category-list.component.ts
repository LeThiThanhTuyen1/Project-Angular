import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{
  categories: Category[] = [];
  selectedCategory: Category = { CategoryID: 0, Name: '', Description: '' };
  newCategory: Category = { CategoryID: 0, Name: '', Description: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  openAddModal(): void {
    this.newCategory = { CategoryID: 0, Name: '', Description: '' };
  }

  openEditModal(category: Category): void {
    this.selectedCategory = { ...category };
  }

  addCategory(): void {
    console.log('Adding category:', this.newCategory);
    // Call service to add category and refresh list
    // Close modal on success
  }

  editCategory(): void {
    console.log('Editing category:', this.selectedCategory);
    // Call service to edit category and refresh list
    // Close modal on success
  }
  
  deleteCategory(category: any) {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa '${category.Name}' không?`);
    if (confirmed) {
      const index = this.categories.indexOf(category);
      if (index !== -1) {
        this.categories.splice(index, 1);
      }
    }
  }
}
