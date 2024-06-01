import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { AccountListComponent } from './component/account-list/account-list.component';
import { DishDetailComponent } from './component/dish-detail/dish-detail.component';
import { DishListComponent } from './component/dish-list/dish-list.component';
import { CategoryDetailComponent } from './component/category-detail/category-detail.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { OrderListComponent } from './component/order-list/order-list.component';

const routes: Routes = [
  { path: 'accounts', component: AccountListComponent },
  { path: 'accounts/:id', component: AccountDetailComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'dishes', component: DishListComponent },
  { path: 'dishes/:id', component: DishDetailComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: '', redirectTo: '/accounts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
