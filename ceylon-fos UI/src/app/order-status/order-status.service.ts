import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private httpService: HttpService) { }

  checkStatus(data: any) {
    return this.httpService.checkStatus(data);
  }
}
