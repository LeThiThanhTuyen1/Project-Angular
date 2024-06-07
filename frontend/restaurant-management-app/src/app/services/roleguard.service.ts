import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getCurrentUserRole();
    if (role === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/dishes']); // Điều hướng về trang khác nếu không phải admin
      return false;
    }
  }
}
