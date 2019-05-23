import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {AuthService} from '../../service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public pushRightClass: string;

  constructor(public router: Router,private authService: AuthService) {
      this.router.events.subscribe(val => {
          if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
              this.toggleSidebar();
          }
      });
  }

  ngOnInit() {
      this.pushRightClass = 'push-right';
  }

  isToggled(): boolean {
      const dom: Element = document.querySelector('body');
      return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle(this.pushRightClass);
  }

  onLoggedout() {
     this.authService.logout();
     this.router.navigate(['/login']);
  }
  getProfile(){
    this.router.navigate(['/user']);
  }
  changePassword(){
    this.router.navigate(['/user/setting']);
  }
}
