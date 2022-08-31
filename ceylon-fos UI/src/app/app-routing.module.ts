import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderCreationComponent } from './order-creation/order-creation.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'createOrder', component: OrderCreationComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
