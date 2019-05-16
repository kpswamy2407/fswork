import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators'
import {RestApiService} from './rest-api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private restApiService: RestApiService){}

  isLoggedIn = false;
  token='';
  user: any;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(loginUser,userToken): Observable<any> {
      if(loginUser && userToken){
        this.user=loginUser;
        this.token=userToken;
        this.isLoggedIn=true;
        return loginUser;
      }
      else{
        this.user=null;
        this.token='';
        this.isLoggedIn=false;
        return null;
      }
  }

  logout() {
    this.user=null;
    this.token='';
    this.isLoggedIn=false;
  }
}
