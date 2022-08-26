import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/http.service';
import { Dispatch } from './Dispatch.model';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor(private httpService: HttpService) { }

  getDispatches(): Observable<Dispatch[]> {
    return this.httpService.getAllDispatches();
  }
}
