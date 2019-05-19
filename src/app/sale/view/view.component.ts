import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import {ActivatedRoute,Router  } from "@angular/router";
import {Location} from '@angular/common';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
	selectedId: number;
	errorMessage: string;
	sale: any;
	hasError: Boolean;
  isLoaded: Boolean;
  showSpinner: Boolean;
  	constructor(private restApiService: RestApiService,private activatedRoute: ActivatedRoute, private router: Router,private _location: Location) {
      this.isLoaded=false;
      this.showSpinner=true;
     }

  	ngOnInit() {
  		this.selectedId=this.activatedRoute.snapshot.params['id'];
  		this.getSaleDetails(this.selectedId);
  	}
  	getSaleDetails(id){
  		const url=`sale/get/${id}`;
  		this.restApiService.getAll(url).subscribe(result=>{
  			if(result.status==200){
  				this.sale=result.sale;
          this.isLoaded=true;
          this.showSpinner=false;
  			}
  			else{
  				this.errorMessage="No sale is exists with provided input."
  				this.hasError=true;
          this.showSpinner=false;
  			}
  		})

  	}
    goBack(){
      this._location.back();
    }

}
