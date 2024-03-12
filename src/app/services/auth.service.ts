import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  check: boolean=false;
  isAuthenticated(): boolean {
    this.apiService.jwtUserToken.subscribe(token => {
        if (token) {
          const decoded: any = jwtDecode(token);
          if (decoded.exp) {
            // Token is valid, user is logged in
            this.check= true;
          } else {
            // Token is expired or invalid
            this.check= false;
          }
        } else {
          // No token available
          this.check= false;
        }
      });
      return this.check;
  }
}
