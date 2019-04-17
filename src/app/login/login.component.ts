import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import {RestApiService} from '../service/rest-api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private restApiService:RestApiService) {
    this.loginForm=this.fb.group({
      'username':[null,Validators.required],
      'password':[null,Validators.required]
    })
   }

  ngOnInit() {

  }
  login(){
    this.restApiService.postData('users/login',this.loginForm.value).subscribe(result=>{
      console.log(result);
      if(result.status==200){

      }else{
        
      }
    })
  }

}
