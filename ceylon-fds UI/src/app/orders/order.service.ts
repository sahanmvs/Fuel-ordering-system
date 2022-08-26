import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/http.service';
import { Order } from './Orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService) { }

  getOrders(): Observable<Order[]> {
    return this.httpService.getAllOrders();
  }
}
