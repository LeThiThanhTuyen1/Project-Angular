import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccount: Account | null = null;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccounts();
    this.getAccount(2);
  }

  getAccounts(): void {
    this.accountService.getAllAccounts()
      .subscribe(accounts => {
        console.log(accounts); // Log dữ liệu ra console
        this.accounts = accounts;
      }, error => {
        console.error('Error fetching accounts:', error);
      });
  }

  getAccount(id: number): void {
    this.accountService.getAccountById(id)
      .subscribe(account => {
        console.log(account); // Log dữ liệu ra console
        this.selectedAccount = account;
      }, error => {
        console.error('Error fetching account:', error);
      });
  }
  
}
