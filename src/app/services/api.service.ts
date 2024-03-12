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

  // To get all the unique item names from collection itemReport to show as filter option 
  getUniqueItemNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/item-report/unique`);
  }

  // get the table as an array based on/ without filter
  getTable(itemName?: string): Observable<AggrEvent[]> {
    let url = `${this.API_URL}/item-report`;
    if (itemName) {
      url += `?keyword=${itemName}`;
      console.log(itemName);
    }
    return this.http.get<AggrEvent[]>(url);
  }

  // Login with toaster indicating login successful or fail 
  login(username: string, password: string) {
    this.http.post(`${this.API_URL}/auth/login`, {username, password})
      .subscribe((res: any) => {
        this.token = res.token;
        if(this.token){
          this.toast.success('Login successful, redirecting now...', '', {
            timeOut: 1000,
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

  // Create new event 
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
    return this.http.post(`${this.API_URL}/event`, payload, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  // Logout from Current User 
  logout() {
    this.token = '';
    this.jwtToken$.next(this.token);
    this.toast.success('Logged out succesfully', '', {
      timeOut: 2000
    }).onHidden.subscribe(() => {
      localStorage.removeItem('act');
      this.router.navigateByUrl('/').then();
    });
    return '';
  }
}
