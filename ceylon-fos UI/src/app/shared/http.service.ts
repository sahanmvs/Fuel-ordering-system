import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../order-creation/Order.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private orderURL = 'http://localhost:8191/orders'
  private orderStatusURL = 'http://localhost:8191/orders/status'
  private orderConfirmURL = 'http://localhost:8191/orders/confirm'

  constructor(private http: HttpClient) { }

  createOrder(data: any) {
    return this.http.post(this.orderURL, data);
  }

  checkStatus(data: any) {
    return this.http.post(this.orderStatusURL, data);
  }

  confirmOrder(data: Order) {
    return this.http.put(this.orderConfirmURL, data);
  }
}
