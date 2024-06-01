import { Order } from './order.model';
import { Dish } from './dish.model';

export interface OrderDetail {
    orderDetailID: number;
    orderID: number;
    order: Order;
    dishID: number;
    dish: Dish;
    quantity: number;
    unitPrice: number;
  }
  