import { Order } from './order.model';
import { Dish } from './dish.model';

export interface OrderDetail {
    OrderDetailID: number;
    OrderID: number;
    Order: Order;
    DishID: number;
    Dish: Dish;
    Quantity: number;
    UnitPrice: number;
  }
  