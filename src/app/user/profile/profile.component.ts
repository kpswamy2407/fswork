import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  constructor(private authService: AuthService,private location: Location) { }

  ngOnInit() {
  	this.user=this.authService.user;
  }
  goBack(){
  	this.location.back();
  }
}
