import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:5100/api/orders';

  constructor(private http: HttpClient) {}

  addDishToOrder(userId: number, dishId: number): Observable<any> {
    const order = {
      AccountID: userId,
      OrderDetails: [{ DishID: dishId, Quantity: 1, Price: 0 }]
    };
    return this.http.post<any>(`${this.apiUrl}/add`, order);
  }
}
