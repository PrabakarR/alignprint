import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'new-order', component: NewOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
