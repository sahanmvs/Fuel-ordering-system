import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderCreationComponent } from './order-creation/order-creation.component';
import { OrderStatusComponent } from './order-status/order-status.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'createOrder', component: OrderCreationComponent},
  { path: 'checkStatus', component: OrderStatusComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
