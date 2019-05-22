import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators'
import {RestApiService} from './rest-api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: Boolean;
  token='';
  user: any;
  userType: Number;
  constructor(private restApiService: RestApiService){
        this.user=JSON.parse(localStorage.getItem('user'));
        this.token=localStorage.getItem('token');
        this.isLoggedIn=JSON.parse(localStorage.getItem('isLoggedIn'));
        this.userType=JSON.parse(localStorage.getItem('userType'));
   
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(loginUser,userToken): Observable<any> {
      if(loginUser && userToken){
        this.user=loginUser;
        this.token=userToken;
        this.isLoggedIn=true;
        this.userType=loginUser.userType;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', userToken);
        localStorage.setItem('user',JSON.stringify(loginUser));
        localStorage.setItem('userType', loginUser.userType);
        return loginUser;
      }
      else{
        this.user=null;
        this.token='';
        this.isLoggedIn=false;
        this.userType=0;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        return null;
      }
  }

  logout() {
    this.user=null;
    this.token='';
    this.isLoggedIn=false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  }
}
