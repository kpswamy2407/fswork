import { Component, OnInit,ViewChild } from '@angular/core';
import { Product} from '../product';
import {RestApiService} from '../../service/rest-api.service';
import {DialogService} from '../../service/dialog.service';
import {MatTableDataSource,MatDialog,MatSort,MatPaginator} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products:Product[];
  sortedData:Product[];
  displayedColumns=['code','supplier','size','category','brand','buyingPrice','sellingPrice','noOfItems','noOfItemsLeft','action'];
  dataSource = new MatTableDataSource(this.products);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private restApiService:RestApiService,private dialogService:DialogService,private dialog: MatDialog,private router: Router) {
    this.getAll();
    
   }
  
  ngOnInit() {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }
  

  getAll(){
    this.restApiService.getAll('product/getall').subscribe(result=>{
      if(result.status==200){
        this.products=result.products;
        this.dataSource.data=this.products;
      }
      else{
        this.products=[];
      }    
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }
  onDelete(id){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.restApiService.deleteData('product/delete',id).subscribe(res=>{
          if(res.status==200){
            this.getAll();
          }
        })
      }
    });
  }
  edit(id){
    this.router.navigate(['product/edit',id]);
  }
  barcode(code,sp,noOfItems,noOfItemsLeft){
  	this.router.navigate(['product/barcode',code,sp,noOfItems,noOfItemsLeft]);
  }
}
