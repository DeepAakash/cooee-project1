import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AggrEvent } from 'src/app/models/aggrEvent';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  aggrEventList!: AggrEvent[];
  dataSource: any;
  displayedColumns: string[] = ['DateTime', 'ItemID', 'ItemName', 'ViewCount', 'AddToCartCount', 'PurchaseCount'];

  // To hide/unhide Create Event option
  showCreate: boolean=true;

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
