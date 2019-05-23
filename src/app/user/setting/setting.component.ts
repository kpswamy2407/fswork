import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {RestApiService} from '../../service/rest-api.service';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

	editForm:FormGroup;
	showSpinner:boolean;
	submitted:boolean;
	errorMessage:string;
	successMessage:string;
	hasError:Boolean;
	isOpCompleted:Boolean;
	constructor(private fb:FormBuilder,private restApiService:RestApiService,private router:Router,private location: Location,private authService: AuthService) {
		this.editForm=this.fb.group({
			'id':[this.authService.user.id],
			'password':[null,Validators.required],
			'new_password':[null,Validators.required],
			'confirm_password':[null,Validators.required]
		});
	}
	ngOnInit() {
	}
  /*checkPasswords() { // here we have the 'passwords' group
	  let pass = this.editForm.value.new_password;
	  let confirmPass = this.editForm.value.confirm_password;

	  return pass === confirmPass ? null : { notSame: true }     
	}*/
	goBack(){
		this.location.back();
	}

	changePassword(){
		this.submitted=true;
		this.showSpinner=true;
		this.hasError=false;
		this.isOpCompleted=false;
  		if(this.editForm.valid){

  			this.restApiService.postData('users/changepassword',this.editForm.value).subscribe(result=>{
			if(result.status==200){
				this.isOpCompleted=true;
				this.successMessage=result.message;
				this.editForm.reset();
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
}
