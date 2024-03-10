import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private apiService: ApiService){
    this.apiService.getTable().subscribe(res=>{
      this.aggrEventList=res;
      this.dataSource=new MatTableDataSource<AggrEvent>(this.aggrEventList);
      this.dataSource.paginator=this.paginator;
    })
  }
}
