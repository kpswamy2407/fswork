import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRoutingModule } from './supplier-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { MaterialModule} from '../includes/material/material.module';
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SupplierModule { }
