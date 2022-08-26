import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../orders/Orders.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private orderUrl: string = 'http://localhost:8191/orders';

  constructor(private http: HttpClient) { 

  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }

}
