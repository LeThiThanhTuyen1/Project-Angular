import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { Router } from '@angular/router';
import { DishService } from '../../services/dish.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public dishes: Dish[] = [];

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
    });
  }


}
