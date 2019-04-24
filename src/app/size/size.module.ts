import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SizeRoutingModule } from './size-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    SizeRoutingModule
  ]
})
export class SizeModule { }
