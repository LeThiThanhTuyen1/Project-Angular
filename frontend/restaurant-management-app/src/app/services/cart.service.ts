import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish } from '../models/dish.model';
import { CartItem } from '../models/cart-item.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.items);

  addToCart(dish: Dish) {
    const existingItem = this.items.find(item => item.DishID === dish.DishID);
    if (existingItem) {
      existingItem.Quantity++;
    } else {
      this.items.push({
        DishID: dish.DishID,
        Name: dish.Name,
        Price: dish.Price,
        Quantity: 1,
        ImageURL: dish.ImageURL
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
