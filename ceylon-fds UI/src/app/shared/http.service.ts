import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DispatchUpdate } from '../dispatch-update/DispatchUpdate.model';
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
    return this.http.get<Dispatch[]>(this.dispatchOrderUrl);
  }

  getDispatch(id: string): Observable<DispatchUpdate[]> {
    return this.http.get<DispatchUpdate[]>(`${this.dispatchOrderUrl}/${id}`);
  }

}
