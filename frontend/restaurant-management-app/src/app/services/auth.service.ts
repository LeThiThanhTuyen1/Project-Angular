import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  login() {
    this.isLoggedInSubject.next(true);
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('isLoggedIn', 'true');
    }
  }

  logout() {
    this.isLoggedInSubject.next(false);
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUserRole(): string {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.Role : '';
  }

  getCurrentUser(): Account | null {
    if (this.isLocalStorageAvailable()) {
      const currentUser = localStorage.getItem('currentUser');
      return currentUser ? JSON.parse(currentUser) : null;
    }
    return null;
  }

  private checkLoginStatus(): boolean {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
