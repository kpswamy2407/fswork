import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from '../includes/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';

import { SaleRoutingModule } from './sale-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    SaleRoutingModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class SaleModule { }
