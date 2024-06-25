import { Component, OnInit } from '@angular/core';
import { TableBooking } from '../../../models/table-booking.model';
import { TableBookingService } from '../../../services/table-booking.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  bookings: TableBooking[] = [];
  userId: number = 0;

  constructor(private authService: AuthService, private tableBookingService: TableBookingService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log('Current userId:', this.userId);
    this.getBookingsByAccountId(); // Fetch bookings for the current userId
  }

  getBookingsByAccountId() {
    this.tableBookingService.getTableBookingsByAccountId(this.userId).subscribe(
      bookings => {
        this.bookings = bookings;
      },
      error => {
        console.error('Error fetching bookings:', error);
      }
    );
  }
}
