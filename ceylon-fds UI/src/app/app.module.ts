import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; '@angular/forms'
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { HttpService } from './shared/http.service';
import { DispatchComponent } from './dispatch/dispatch.component';
import { HomeComponent } from './home/home.component';
import { DispatchUpdateComponent } from './dispatch-update/dispatch-update.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    DispatchComponent,
    HomeComponent,
    DispatchUpdateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'orders', component: OrdersComponent},
      { path: 'dispatch', component: DispatchComponent},
      { path: 'dispatch/:id', component: DispatchUpdateComponent},
      { path: 'home', component: HomeComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
