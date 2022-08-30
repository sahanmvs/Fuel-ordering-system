import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dispatch } from '../dispatch/Dispatch.model';
import { HttpService } from '../shared/http.service';
import { DispatchUpdate } from './DispatchUpdate.model';

@Injectable({
  providedIn: 'root'
})
export class DispatchUpdateService {

  constructor(private httpService: HttpService) { }

  getDispatch(id: string): Observable<DispatchUpdate[]> {
    return this.httpService.getDispatch(id);
  }

  dispatchOrder(id: string, data: DispatchUpdate) {
    return this.httpService.dispatchOrder(id, data);
  }
}
