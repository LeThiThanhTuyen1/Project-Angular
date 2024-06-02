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
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
