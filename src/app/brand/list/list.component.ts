import { Component, OnInit,ViewChild } from '@angular/core';
import { Brand } from '../brand';
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

  brands:Brand[];
  sortedData:Brand[];
  displayedColumns=['id','name','code','isActive','action'];
  dataSource = new MatTableDataSource(this.brands);
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
    this.restApiService.getAll('brand/getall').subscribe(result=>{
      if(result.status==200){
        this.brands=result.brands;
        this.dataSource.data=this.brands;
      }
      else{
        this.brands=[];
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
        this.restApiService.deleteData('brand/delete',id).subscribe(res=>{
          if(res.status==200){
            this.getAll();
          }
        })
      }
    });
  }
  edit(id){
    this.router.navigate(['brand/edit',id]);
  }
  


}
