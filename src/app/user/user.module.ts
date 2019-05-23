import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [ProfileComponent, SettingComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
