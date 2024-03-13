import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AggrEvent } from 'src/app/models/aggrEvent';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private apiService: ApiService, private router: Router){
    this.apiService.getTable().subscribe(res=>{
      this.aggrEventList=res;
      this.dataSource=new MatTableDataSource<AggrEvent>(this.aggrEventList);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }
  
  aggrEventList!: AggrEvent[];
  dataSource: any;
  displayedColumns: string[] = ['DateTime', 'ItemID', 'ItemName', 'ViewCount', 'AddToCartCount', 'PurchaseCount'];
  uniqueItemNames: string[] = [];
  selectedItem: string = "";

  // To hide/unhide Create Event option
  showCreate: boolean=false;
  ngOnInit(): void {
    // To get options for dreopdown feature 
    this.apiService.getUniqueItemNames().subscribe(names => {
      this.uniqueItemNames = names;
    });

    this.apiService.jwtUserToken.subscribe(token => {
      if (token) {
        const decoded: any = jwtDecode(token);
        if (decoded.exp) {
          // Token is valid, user is logged in
          this.showCreate = true; // Hide the login button
        } else {
          // Token is expired or invalid, show the login button
          this.showCreate = false;
          this.router.navigateByUrl('/'); // Redirect to login page if needed
        }
      } else {
        // No token available, show the login button
        this.showCreate = false;
      }
    });
  }

  // FILTER OPTION USING THE BACKEND
  onItemSelected(itemName: string): void {
    if (itemName === "") {
      // If "All" is selected, show all items
      this.dataSource.data = this.aggrEventList;
    } else {
      // Filter the data based on selected item
      this.apiService.getTable(itemName).subscribe(
        (response) => {
          this.dataSource.data = response;
        },
        (error) => {
          console.error('Error sending item:', error);
        }
      );
    }
  }


  // ✨✨✨FILTER OPTION USING THE FRONTEND✨✨✨
  // onItemSelected(item: string) {
  //   if (item === "") {
  //     // Show all items
  //     this.dataSource.data = this.aggrEventList;
  //   } else {
  //     // Filter the data based on selected item
  //     this.dataSource.data = this.aggrEventList.filter(event => event.ItemName === item);
  //   }
  // }

  // To implement search feature 
  FilterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // For pagination feature
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  // For sorting feature
  @ViewChild(MatSort) sort !: MatSort;
}
