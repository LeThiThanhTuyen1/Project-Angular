import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail } from '../models/order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiUrl = 'http://localhost:5100/api/orderdetails';

  constructor(private http: HttpClient) { }

  getAllOrderDetails(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(this.apiUrl);
  }

  getOrderDetailById(id: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}/${id}`);
  }

  createOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.apiUrl, orderDetail);
  }

  updateOrderDetail(id: number, orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.put<OrderDetail>(`${this.apiUrl}/${id}`, orderDetail);
  }

  deleteOrderDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
