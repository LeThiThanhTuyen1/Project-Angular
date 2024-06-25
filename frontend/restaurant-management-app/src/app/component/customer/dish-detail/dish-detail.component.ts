import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../../../services/dish.service';
import { Dish } from '../../../models/dish.model';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish: Dish | null = null;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService
  ) { }

  ngOnInit(): void {
    this.getDishDetail();
  }

  getDishDetail(): void {
    const id = +this.route.snapshot.paramMap.get;
    this.dishService.getDishById(id).subscribe(dish => {
      this.dish = dish;
    }, error => {
      console.error('Error fetching dish details:', error);
    });
  }
}

