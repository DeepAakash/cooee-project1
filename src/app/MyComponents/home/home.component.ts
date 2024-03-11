import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { jwtDecode } from 'jwt-decode';
import { AggrEvent } from 'src/app/models/aggrEvent';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  aggrEventList!: AggrEvent[];
  dataSource: any;
  displayedColumns: string[] = ['DateTime', 'ItemID', 'ItemName', 'ViewCount', 'AddToCartCount', 'PurchaseCount'];

  // To hide/unhide Create Event option
  showCreate: boolean=true;
  ngOnInit(): void {
    this.apiService.jwtUserToken.subscribe(token => {
      if (token) {
        console.log(token)
        const decoded: any = jwtDecode(token);
        if (decoded.exp) {
          // Token is valid, user is logged in
          this.showCreate = false; // Hide the login button
        } else {
          // Token is expired or invalid, show the login button
          this.showCreate = true;
        }
      } else {
        // No token available, show the login button
        this.showCreate = true;
      }
    });
  }

  // For pagination feature
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  // For sorting feature
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private apiService: ApiService){
    this.apiService.getTable().subscribe(res=>{
      this.aggrEventList=res;
      this.dataSource=new MatTableDataSource<AggrEvent>(this.aggrEventList);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  // To implement search feature 
  FilterChange(data:any){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }
}
