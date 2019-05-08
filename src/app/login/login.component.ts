import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms';
import {RestApiService} from '../service/rest-api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    logiForm: FormGroup;
    errorMessage: String;
    hasError: Boolean;
    showSpinner: Boolean;
    constructor(private router: Router,private restApiService: RestApiService, private fb: FormBuilder) {
    	this.logiForm=this.fb.group({
    		'username':[null,Validators.required],
    		'password':[null,Validators.required]
    	})
    }

    ngOnInit() {}

    onLogin() {
    	console.log(this.logiForm.value)
    	if(this.logiForm.valid){
    		this.showSpinner=true;
        	this.restApiService.postData('users/login',this.logiForm.value).subscribe(result=>{
                console.log(result);
            })
            this.router.navigate(['/dashboard']);
    	}
    	else{
    		console.log(this.logiForm.value)
    	}
        
    }
}

