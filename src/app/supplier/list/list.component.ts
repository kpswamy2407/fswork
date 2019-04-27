import { Component, OnInit,ViewChild } from '@angular/core';
import { Supplier } from '../supplier';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DialogService } from 'src/app/service/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  suppliers:Supplier[];
  sortedData:Supplier[];
  displayedColumns=['id','name','code','address','isActive','action'];
  dataSource = new MatTableDataSource(this.suppliers);
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
    this.restApiService.getAll('supplier/getall').subscribe(result=>{
      if(result.status==200){
        this.suppliers=result.suppliers;
        this.dataSource.data=this.suppliers;
      }
      else{
        this.suppliers=[];
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
        this.restApiService.deleteData('supplier/delete',id).subscribe(res=>{
          if(res.status==200){
            this.getAll();
          }
        })
      }
    });
  }
  edit(id){
    this.router.navigate(['supplier/edit',id]);
  }
  


}
