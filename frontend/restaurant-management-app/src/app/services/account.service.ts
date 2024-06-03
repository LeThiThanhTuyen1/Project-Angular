import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from '../models/account.model';
import { Router } from '@angular/router';
import { AccountDetailComponent } from '../component/account-detail/account-detail.component';
import { AccountListComponent } from '../component/account-list/account-list.component';
import { RegisterComponent } from '../component/register/register.component';
import { log } from 'console';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:5100/api/accounts';
  list: Account[] = [];
 // formData: Account = new Account();

  constructor(private http: HttpClient, private router: Router) { }

  refreshList() {
    this.http.get(this.apiUrl)
      .subscribe({
        next: res => {
          this.list = res as Account[]
        },
        error: err => { console.log(err)}
      })
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }

  updateAccount(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkUsernameExistsById(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.getAllAccounts().pipe(
      map(accounts => {
        const account = accounts.find(acc => acc.Username === username);
        if (!account) {
          return 'Tên đăng nhập không tồn tại';
        } else if (account.Password !== password) {
          return 'Mật khẩu không khớp';
        } else {
          return 'success';
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { username, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError('Username already exists');
        } else if (error.status === 400) {
          return throwError('Invalid password');
        } else {
          return throwError('Registration failed');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/dishes']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }  
}
