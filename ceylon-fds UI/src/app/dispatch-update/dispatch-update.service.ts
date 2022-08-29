import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dispatch } from '../dispatch/Dispatch.model';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root'
})
export class DispatchUpdateService {

  constructor(private httpService: HttpService) { }

  getDispatch(id: string): Observable<Dispatch> {
    return this.httpService.getDispatch(id);
  }
}
