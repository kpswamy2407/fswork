import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms';
import {RestApiService} from '../service/rest-api.service';
import {AuthService} from '../service/auth.service';

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
   
    constructor(private router: Router,private restApiService: RestApiService, private fb: FormBuilder, private authService: AuthService) {
         if (this.authService.isLoggedIn) {
                            if(this.authService.userType==1){
                                let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/dashboard';   
                            }
                            else{
                                let redirect='/sale';
                            }
                            this.router.navigateByUrl(redirect);
                    }
        this.logiForm=this.fb.group({
    		'username':[null,Validators.required],
    		'password':[null,Validators.required]
    	})
    }

    ngOnInit() {}

    onLogin() {
    	if(this.logiForm.valid){
    		this.showSpinner=true;
            this.hasError=false;
        	this.restApiService.postData('users/login',this.logiForm.value).subscribe(result=>{
                if(result.status==200){
                    this.authService.login(result.user,result.token);
                     if (this.authService.isLoggedIn) {
                            if(this.authService.userType==1){
                                let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/dashboard';   
                            }
                            else{
                                let redirect='/sale';
                            }
                            this.router.navigateByUrl(redirect);
                    }
                    
                }
                else{
                    this.errorMessage=result.error;
                    this.showSpinner=false;
                    this.hasError=true;
                }
            })
            
    	}
    }
}

