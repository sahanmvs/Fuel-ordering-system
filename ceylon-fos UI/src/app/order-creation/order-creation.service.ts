import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Order } from './Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderCreationService {

  constructor(private httpService: HttpService) { }

  createOrder(data: any) {
    return this.httpService.createOrder(data);
  }
}
