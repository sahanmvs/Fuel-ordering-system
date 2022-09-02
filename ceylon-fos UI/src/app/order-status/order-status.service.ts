import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Order } from './Order.Model';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private httpService: HttpService) { }

  checkStatus(data: any) {
    return this.httpService.checkStatus(data);
  }

  confirmOrder(data: Order) {
    return this.httpService.confirmOrder(data);
  }
}
