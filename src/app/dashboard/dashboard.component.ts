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
    showSpinner: Boolean;
    isLoaded: Boolean;
    displayedColumns=['id','customer','totalAmount','createdAt','action'];
    dataSource = new MatTableDataSource(this.sales);
    places: Array<any> = [];
    records: any;
    
    constructor(private restApiService: RestApiService) {
        this.showSpinner=true;
        this.isLoaded=false;
        this.getDashboard();
        this.getRecentSale();
    }

    ngOnInit() {
        this.showSpinner=true;
    }
    getDashboard(){
        this.showSpinner=true;
        this.isLoaded=false;
        this.restApiService.getAll('users/dashboard').subscribe(result=>{
             if(result.status=200){
                this.records=result.records;
                this.showSpinner=false;
                this.isLoaded=true;
            }
        })
    }
     getRecentSale(){
        this.showSpinner=true;
        this.isLoaded=false;
        this.restApiService.getAll('sale/recent').subscribe(result=>{
            if(result.status=200){
                this.sales=result.sales;
                this.dataSource.data=this.sales;
                this.showSpinner=false;
                this.isLoaded=true;
            }
        })
    }
}
