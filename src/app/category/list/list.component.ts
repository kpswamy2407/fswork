import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import {RestApiService} from '../../service/rest-api.service';
import {MatSort, MatTableDataSource,MatPaginator,MatDialog, MatDialogConfig} from '@angular/material';
import { Category } from '../category';
import { DialogService } from '../../service/dialog.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categories:Category[];
  sortedData:Category[];
  displayedColumns=['id','name','code','isActive','action'];
  dataSource = new MatTableDataSource(this.categories);
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
    this.restApiService.getAll('category/getall').subscribe(result=>{
      if(result.status==200){
        this.categories=result.categories;
        this.dataSource.data=this.categories;
      }
      else{
        this.categories=[];
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
        this.restApiService.deleteData('category/delete',id).subscribe(res=>{
          if(res.status==200){
            this.getAll();
          }
        })
      }
    });
  }
  edit(id){
    this.router.navigate(['category/edit',id]);
  }
  

}


