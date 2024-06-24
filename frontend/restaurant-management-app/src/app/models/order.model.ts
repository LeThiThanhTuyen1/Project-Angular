import { Account } from './account.model';
import { OrderDetail } from './order-detail.model';

export interface Order {
    OrderID: number;
    AccountID: number;
    Account: Account;
    OrderDate: Date;
    TotalAmount: number;
    OrderDetail: OrderDetail[];
  }
  