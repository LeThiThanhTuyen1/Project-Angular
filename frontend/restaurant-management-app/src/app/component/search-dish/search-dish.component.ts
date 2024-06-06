import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-dish',
  templateUrl: './search-dish.component.html',
  styleUrls: ['./search-dish.component.css']
})
export class SearchDishComponent implements OnInit {
  public dishes: Dish[] = [];
  public searchKeyword: string = '';

  constructor(private dishService: DishService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const keyword = params['q'];
      if (keyword) {
        this.searchKeyword = keyword;
        this.searchDishes(keyword);
      }
    });
  }

  searchDishes(keyword: string): void {
    this.dishService.getAllDishes().subscribe((data: Dish[]) => {
      this.dishes = data.filter(dish => 
        dish.Name.toLowerCase().includes(keyword.toLowerCase()));
    });
  }
}
