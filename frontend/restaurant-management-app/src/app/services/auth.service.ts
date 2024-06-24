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
  private userIdSubject = new BehaviorSubject<number>(0);
  userId$ = this.userIdSubject.asObservable();

  constructor(private router: Router) {}

  login(role: string, userId: number) {
    this.isLoggedInSubject.next(true);
    this.roleSubject.next(role);
    this.userIdSubject.next(userId);
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.roleSubject.next('');
    this.userIdSubject.next(0);
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getRole(): string {
    return this.roleSubject.value;
  }

  getUserId(): number {
    return this.userIdSubject.value;
  }
}
