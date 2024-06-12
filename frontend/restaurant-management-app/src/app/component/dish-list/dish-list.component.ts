import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { DishService } from '../../services/dish.service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})
export class DishListComponent implements OnInit{
  
  dishes: Dish[] = [];
  allDishes: any[] = [];
  filteredDishes: any[] = [];
  categories: Category[] = [];
  searchKeyword: string = '';
  selectedCategoryId: number | null = null;

  constructor(public dishService: DishService, 
              private router: Router,
              private route: ActivatedRoute,
              public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchKeyword = params['search'] || '';
      this.selectedCategoryId = params['category'] || null;

      if (this.searchKeyword) {
        this.searchDishes(this.searchKeyword);
      } else {
        this.getAllDishes();
      }
    });

    this.getCategories();
  }

  searchDishes(keyword: string): void {
    this.dishService.searchDishes(keyword).subscribe(
      data => {
        this.allDishes = data;
        this.filteredDishes = this.filterDishesByCategory(this.selectedCategoryId);
      },
      error => {
        console.error('Error fetching search results', error);
      }
    );
  }

  getAllDishes(): void {
    this.dishService.getAllDishes().subscribe(
      data => {
        this.allDishes = data;
        this.filteredDishes = this.filterDishesByCategory(this.selectedCategoryId);
      },
      error => {
        console.error('Error fetching dishes', error);
      }
    );
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  filterByCategory(event: Event, categoryId: number): void {
    event.preventDefault();
    this.selectedCategoryId = categoryId;
    this.filteredDishes = this.filterDishesByCategory(categoryId);
  }

  filterDishesByCategory(categoryId: number | null): any[] {
    if (categoryId === null) {
      return this.allDishes;
    }
    return this.allDishes.filter(dish => dish.CategoryID === categoryId);
  }

  getCategoryCount(categoryId: number): number {
    return this.allDishes.filter(dish => dish.CategoryID === categoryId).length;
  }

}
