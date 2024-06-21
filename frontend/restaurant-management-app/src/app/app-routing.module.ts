import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { AccountListComponent } from './component/admin/admin-home/account-list/account-list.component';
import { DishDetailComponent } from './component/customer/dish-detail/dish-detail.component';
import { DishListComponent } from './component/customer/dish-list/dish-list.component';
import { CategoryDetailComponent } from './component/category-detail/category-detail.component';
import { CategoryListComponent } from './component/admin/admin-home/category-list/category-list.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { LoginComponent } from './component/backet/login/login.component';
import { RegisterComponent } from './component/customer/register/register.component';
import { AboutUsComponent } from './component/backet/about-us/about-us.component';
import { ContactComponent } from './component/backet/contact/contact.component';
import { HomeComponent } from './component/customer/home/home.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AdminDishesComponent } from './component/admin/admin-home/admin-dishes/admin-dishes.component';

const routes: Routes = [
  { path: 'accounts', component: AccountListComponent },
  { path: 'accounts/:id', component: AccountDetailComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'dishes', component: DishListComponent },
  { path: 'dishes/:id', component: DishDetailComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'admin/home', component: AdminHomeComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'admin/dishes', component: AdminDishesComponent},
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
