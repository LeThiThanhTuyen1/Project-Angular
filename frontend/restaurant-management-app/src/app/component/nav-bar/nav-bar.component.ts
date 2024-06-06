import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  searchKeyword: string = '';
  isLoggedIn: boolean = false;

  private authSubscription!: Subscription;

  constructor(private authService: AuthService, 
              private router: Router,
              private searchService: SearchService) {}

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSearch(): void {
    this.router.navigate(['/search-dish'], { queryParams: { q: this.searchKeyword } });
  }
}
