import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'add-new-order', component: AddNewOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
