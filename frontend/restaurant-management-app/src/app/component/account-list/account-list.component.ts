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

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
     this.accountService.getAllAccounts().subscribe(data => {
       this.accounts = data;
     });
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
}
