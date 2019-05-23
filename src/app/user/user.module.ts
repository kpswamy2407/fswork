import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { MaterialModule} from '../includes/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [ProfileComponent, SettingComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
  ]
})
export class UserModule { }
