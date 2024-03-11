import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AggrEvent } from '../models/aggrEvent';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL='http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  getTable(): Observable<AggrEvent[]>{
    return this.http.get<AggrEvent[]>(`${this.API_URL}/item-report`);
  }

  create(device: string, name: string, occurred: Date, itemId: string, itemName: string): Observable<any> {
    const payload = {
      device: device,
      name: name,
      occurred: occurred,
      item: {
        id: itemId,
        name: itemName
      }
    };
    // console.log(payload);
    return this.http.post(`${this.API_URL}/event`, payload);
  }
}
