import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AggrEvent } from '../models/aggrEvent';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL='http://localhost:3000/api';
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService){
      const fetchedToken = localStorage.getItem('act');
      if (fetchedToken) {
        this.token = atob(fetchedToken);
        this.jwtToken$.next(this.token);
      }
  }

  get jwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  getTable(): Observable<AggrEvent[]>{
    return this.http.get<AggrEvent[]>(`${this.API_URL}/item-report`);
  }

  // Login with toaster indicating login successful or fail 
  login(username: string, password: string) {
    this.http.post(`${this.API_URL}/auth/login`, {username, password})
      .subscribe((res: any) => {
        this.token = res.token;
        if(this.token){
          this.toast.success('Login successful, redirecting now...', '', {
            timeOut: 700,
            positionClass: 'toast-top-center'
          }).onHidden.toPromise().then(() => {
            this.jwtToken$.next(this.token);
            localStorage.setItem('act', btoa(this.token));
            this.router.navigateByUrl('/').then();
          });
        }
      }, (err: HttpErrorResponse) => {
        let errorMessage = 'Authentication failed';
        if (err.error && err.error.message) {
          errorMessage += '</br>' + err.error.message;
        }
        this.toast.error(errorMessage, '', {
          timeOut: 2000,
          enableHtml: true // Enable HTML in the toast message
        });
      });
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
