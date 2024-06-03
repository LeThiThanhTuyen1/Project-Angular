import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public confirmPassword: string = '';
  public Phonenumber: string = '';
  public username: string = '';
  public password: string = '';
  public message: string = '';
  public id: string = '';
  public formSubmitted: boolean = false;
  usernameExists: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  checkUserName() {
    this.message = '';

    this.accountService.getAllAccounts()
      .subscribe(p => {
        this.usernameExists = p.some(p => p.Username === this.username);
      });
  }

  register(): void {
    this.formSubmitted = true;
    if(this.username && this.password) {
      // Kiểm tra nếu username đã tồn tại trước khi đăng ký
    if (this.usernameExists) {
      this.message = 'Username already exists';
      return;
    }

    // Nếu username chưa tồn tại, thực hiện đăng ký
    this.accountService.register(this.username, this.password)
      .subscribe(
        response => {
          console.log('Registration successful', response);
          this.message = 'Registration successful';
          this.router.navigate(['login']);
        },
        error => {
          console.error('Registration failed', error);
          this.message = error;
        }
      );
    } else {
      this.message = 'Please fill in all required fields';
    }
  }
}
