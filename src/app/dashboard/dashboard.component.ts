import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {RestApiService} from '../service/rest-api.service';
import {Sale} from '../sale/sale';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    sales: Sale[];

    displayedColumns=['id','customer','totalAmount','createdAt','action'];
    dataSource = new MatTableDataSource(this.sales);
    places: Array<any> = [];
    records: any;
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(private restApiService: RestApiService) {
        this.getDashboard();
        this.getRecentSale();
    }

    ngOnInit() {}
    getDashboard(){
        this.restApiService.getAll('users/dashboard').subscribe(result=>{
             if(result.status=200){
                this.records=result.records;
            }
        })
    }
     getRecentSale(){
        this.restApiService.getAll('sale/recent').subscribe(result=>{
            if(result.status=200){
                this.sales=result.sales;
                this.dataSource.data=this.sales;
            }
        })
    }
}
