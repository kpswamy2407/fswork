import { Component, OnInit,ViewChild } from '@angular/core';
import {RestApiService} from '../../service/rest-api.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import { Category } from '../category';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categories:Category[];
  sortedData:Category[];
  displayedColumns=['id','name','code','isActive','createdAt','updatedAt'];
  dataSource = new MatTableDataSource(this.categories);
  @ViewChild(MatSort) sort: MatSort;
  constructor(private restApiService:RestApiService) {
    this.getAll();
    
   }
  
  ngOnInit() {
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

}

