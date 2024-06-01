import { Account } from './account.model';
import { OrderDetail } from './order-detail.model';

export interface Order {
    orderID: number;
    accountID: number;
    account: Account;
    orderDate: Date;
    totalAmount: number;
    orderDetail: OrderDetail[];
  }
  