import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish } from '../models/dish.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Cart[] = [];
  private itemsSubject = new BehaviorSubject<Cart[]>(this.items);

  addToCart(dish: Dish, iduser: number) {
    const existingItem = this.items.find(item => item.DishID === dish.DishID);
    if (existingItem) {
      existingItem.Quantity++;
    } else {
      this.items.push({
        DishID: dish.DishID,
        AccountID: iduser,
        Price: dish.Price,
        Quantity: 1,
      });
    }
    this.itemsSubject.next(this.items);
  }

  getItems() {
    return this.itemsSubject.asObservable();
  }

  clearCart() {
    this.items = [];
    this.itemsSubject.next(this.items);
  }
  
}
