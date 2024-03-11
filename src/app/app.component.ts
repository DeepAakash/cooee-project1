import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cooee-project1';

  // To toggle Welcome and Login Feature
  showMenu: boolean = true;
  username: string = '';

  constructor(private apiService: ApiService, private router: Router){

  }

  ngOnInit(): void {
    this.apiService.jwtUserToken.subscribe(token => {
      if (token) {
        const decoded: any = jwtDecode(token);
        if (decoded.exp) {
          // Token is valid, user is logged in
          this.username = decoded.username;
          this.showMenu = false; // Hide the login button
        } else {
          // Token is expired or invalid, show the login button
          this.showMenu = true;
          this.router.navigateByUrl('/'); // Redirect to login page if needed
        }
      } else {
        // No token available, show the login button
        this.showMenu = true;
      }
    });
  }

  logout(): void{
    this.username='';
    this.apiService.logout();
  }
}
