import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private roleSubject = new BehaviorSubject<string>('');
  role$ = this.roleSubject.asObservable();

  constructor(private router: Router) {}

  login(role: string) {
    this.isLoggedInSubject.next(true);
    this.roleSubject.next(role);
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.roleSubject.next('');
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getRole(): string {
    return this.roleSubject.value;
  }
}
