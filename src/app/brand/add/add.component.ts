import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {RestApiService} from '../../service/rest-api.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	addForm:FormGroup;
	showSpinner:boolean;
	submitted:boolean;
	errorMessage:string;
	successMessage:string;
	hasError:Boolean;
	isOpCompleted:Boolean;
	constructor(private fb:FormBuilder,private restApiService:RestApiService,private router:Router,private location: Location) {
		this.addForm=this.fb.group({
			'name':[null,Validators.required],
			'code':[null,Validators.required],
			'is_active':[null,Validators.required]
		});
	}

	ngOnInit() {
  	}

  	add(){
		this.submitted=true;
		this.showSpinner=true;
		this.hasError=false;
		this.isOpCompleted=false;
  		if(this.addForm.valid){

  			this.restApiService.postData('brand/create',this.addForm.value).subscribe(result=>{
			if(result.status==200){
				this.isOpCompleted=true;
				this.successMessage=result.message;
				this.router.navigate(['brand'])
			}else{
				this.hasError=true
				this.errorMessage=result.error;
			}
			this.showSpinner=false;
			this.submitted=false;
				  
  			})
  		}
  		else{
			this.showSpinner=false;
			this.submitted=false;  
  		}

	  }
	  goBack(){
	  	this.location.back();
	  }
	
}
