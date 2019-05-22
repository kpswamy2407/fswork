import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public showMenu: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {
      this.showMenu = '';
  }

  addExpandClass(element: any) {
      if (element === this.showMenu) {
          this.showMenu = '0';
      } else {
          this.showMenu = element;
      }
  }
  get isAdmin(){
    return (this.authService.userType==1)?true:false;
  }

}
