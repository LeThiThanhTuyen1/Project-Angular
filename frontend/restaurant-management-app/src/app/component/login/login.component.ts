import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public message: string = '';
  public formSubmitted: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  login(): void {
    this.formSubmitted = true;

    if (this.username && this.password) {
      this.accountService.login(this.username, this.password).subscribe(
        response => {
          console.log('Login response:', response); // Log để kiểm tra response từ server
          if (response === 'success') {
            console.log('Đăng nhập thành công');
            this.router.navigate(['/dishes']);  // Điều hướng đến trang khác khi đăng nhập thành công
          } else {
            this.message = response;  // Hiển thị thông báo lỗi tương ứng
          }
        },
        error => {
          console.error('Đăng nhập thất bại!', error); // Log để kiểm tra lỗi
          this.message = 'Tên đăng nhập hoặc mật khẩu không chính xác'; // Gán thông báo lỗi
        }
      );
    } else {
      console.log('Username or password is empty'); // Log để kiểm tra trường hợp thiếu username hoặc password
      this.message = '';
    }
  }
}
