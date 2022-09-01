import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderCreationComponent } from './order-creation/order-creation.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './shared/http.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderStatusComponent } from './order-status/order-status.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderCreationComponent,
    HomeComponent,
    OrderStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
