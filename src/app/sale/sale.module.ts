import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from '../includes/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';

import { SaleRoutingModule } from './sale-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [ListComponent, AddComponent,ViewComponent],
  imports: [
    CommonModule,
    SaleRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPrintModule

  ]
})
export class SaleModule { }
