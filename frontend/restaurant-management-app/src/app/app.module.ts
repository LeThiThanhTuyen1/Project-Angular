import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AccountListComponent } from './component/account-list/account-list.component';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { CategoryDetailComponent } from './component/category-detail/category-detail.component';
import { DishListComponent } from './component/dish-list/dish-list.component';
import { DishDetailComponent } from './component/dish-detail/dish-detail.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from './services/account.service';
import { DishService } from './services/dish.service';
import { OrderService } from './services/order-detail.service';
import { OrderDetailService } from './services/order.service';
import { CategoryService } from './services/category.service';
import { withFetch } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { FooterBarComponent } from './component/footer-bar/footer-bar.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ContactComponent } from './component/contact/contact.component';
import { CategoryFilterPipe } from './models/category-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    AccountDetailComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    DishListComponent,
    DishDetailComponent,
    OrderListComponent,
    OrderDetailComponent,
    LoginComponent,
    RegisterComponent,
    FooterBarComponent,
    NavBarComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    CategoryFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule, 
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AccountService,
    OrderDetailService,
    OrderService,
    CategoryService,
    DishService, 
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
