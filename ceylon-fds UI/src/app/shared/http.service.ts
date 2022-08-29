import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dispatch } from '../dispatch/Dispatch.model';
import { Order } from '../orders/Orders.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private orderUrl: string = 'http://localhost:8191/orders';
  private scheduledOrderUrl: string = 'http://localhost:8192/schedule/orders';
  private dispatchOrderUrl: string = 'http://localhost:8193/dispatches'

  constructor(private http: HttpClient) { 

  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }

  getAllDispatches(): Observable<Dispatch[]> {
    return this.http.get<Dispatch[]>(this.scheduledOrderUrl);
  }

  getDispatch(id: string): Observable<Dispatch> {
    return this.http.get<Dispatch>(`${this.dispatchOrderUrl}/${id}`);
  }

}
