import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
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
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private router: Router,private restApiService: RestApiService, private fb: FormBuilder) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

    	this.logiForm=this.fb.group({
    		'username':[null,Validators.required],
    		'password':[null,Validators.required]
    	})
    }

    ngOnInit() {}

    onLogin() {
    	if(this.logiForm.valid){
    		this.showSpinner=true;
        	this.restApiService.postData('users/login',this.logiForm.value).subscribe(result=>{
                if(result.status==200){
                    this.router.navigate(['/dashboard']);
                }
                else{
                    this.errorMessage=result.error;
                    this.showSpinner=false;
                }
            })
            
    	}
    }
}

