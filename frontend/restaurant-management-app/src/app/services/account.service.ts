import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from '../models/account.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:5100/api/accounts';
  list: Account[] = [];

  constructor(private http: HttpClient, private router: Router) { }

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

  register(username: string, password: string, role: string, phoneNumber: string): Observable<any> {
    const payload = { Username: username, Password: password, Role: role, PhoneNumber: phoneNumber };
    console.log('Payload gửi đi:', payload); // Thêm log này để kiểm tra payload
  
    return this.http.post<any>(`${this.apiUrl}/register`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return throwError('Dữ liệu không hợp lệ');
        } else {
          return 'sucess';
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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}