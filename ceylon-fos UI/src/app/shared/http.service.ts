import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../order-creation/Order.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private orderURL = 'http://localhost:8191/orders'

  constructor(private http: HttpClient) { }

  createOrder(data: any) {
    return this.http.post(this.orderURL, data);
  }
}
