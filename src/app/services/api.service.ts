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
}
