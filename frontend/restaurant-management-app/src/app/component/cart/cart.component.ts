import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  checkout() {
    // Xử lý thanh toán
    alert('Thanh toán thành công!');
    this.cartService.clearCart();
  }
}
