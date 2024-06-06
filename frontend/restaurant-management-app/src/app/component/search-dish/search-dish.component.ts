import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-search-dish',
  templateUrl: './search-dish.component.html',
  styleUrls: ['./search-dish.component.css']
})
export class SearchDishComponent implements OnInit {
  public dishes: Dish[] = [];
  public searchKeyword: string = '';
  public filteredDishes: Dish[] = [];
  public categories: Category[] = [];
  public categoryCounts: { [key: number]: number } = {}; // Số lượng kết quả cho mỗi danh mục
  public selectedCategoryId: number | null = null;

  constructor(private dishService: DishService,
              private categoryService: CategoryService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const keyword = params['q'];
      if (keyword) {
        this.searchKeyword = keyword;
        this.searchDishes(keyword);
      }
    });

    this.loadCategories();
  }

  searchDishes(keyword: string): void {
    this.dishService.getAllDishes().subscribe((data: Dish[]) => {
      this.dishes = data.filter(dish => dish.Name.toLowerCase().includes(keyword.toLowerCase()));
      this.filteredDishes = this.dishes; // Cập nhật danh sách kết quả tìm kiếm
      this.updateCategoryCounts();
    });
  }  

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  updateCategoryCounts(): void {
    // Reset số lượng kết quả cho mỗi danh mục
    this.categories.forEach(category => {
      this.categoryCounts[category.CategoryID] = 0;
    });

    // Cập nhật số lượng kết quả cho mỗi danh mục
    this.dishes.forEach(dish => {
      this.categoryCounts[dish.CategoryID] = (this.categoryCounts[dish.CategoryID] || 0) + 1;
    });
  }

  getCategoryCount(categoryId: number): number {
    return this.categoryCounts[categoryId] || 0;
  }

  filterByCategory(event: any, categoryId: number): void {
    event.preventDefault();
    this.selectedCategoryId = categoryId;
    if (categoryId) {
      // Lọc từ danh sách kết quả tìm kiếm ban đầu
      this.dishes = this.filteredDishes.filter(dish => dish.CategoryID === categoryId);
    } else {
      // Hiển thị lại tất cả kết quả tìm kiếm ban đầu
      this.dishes = this.filteredDishes;
    }
  }
}
