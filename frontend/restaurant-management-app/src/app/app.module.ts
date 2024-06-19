import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//component
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AppComponent } from './app.component';
import { AccountListComponent } from './component/admin/admin-home/account-list/account-list.component';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { CategoryDetailComponent } from './component/category-detail/category-detail.component';
import { DishListComponent } from './component/customer/dish-list/dish-list.component';
import { DishDetailComponent } from './component/customer/dish-detail/dish-detail.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { CategoryListComponent } from './component/admin/admin-home/category-list/category-list.component';
import { LoginComponent } from './component/backet/login/login.component';
import { RegisterComponent } from './component/customer/register/register.component';
import { FooterBarComponent } from './component/backet/footer-bar/footer-bar.component';
import { NavBarComponent } from './component/backet/nav-bar/nav-bar.component';
import { HomeComponent } from './component/customer/home/home.component';
import { AboutUsComponent } from './component/backet/about-us/about-us.component';
import { ContactComponent } from './component/backet/contact/contact.component';
//service
import { AccountService } from './services/account.service';
import { DishService } from './services/dish.service';
import { OrderService } from './services/order-detail.service';
import { OrderDetailService } from './services/order.service';
import { CategoryService } from './services/category.service';
//model
//
import { withFetch } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AdminDishesComponent } from './component/admin/admin-home/admin-dishes/admin-dishes.component';

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
    NavBarComponent,
    RegisterComponent,
    FooterBarComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    AdminHomeComponent,
    AdminDishesComponent,
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
