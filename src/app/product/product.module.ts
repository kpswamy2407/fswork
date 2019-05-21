import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { BarcodeComponent } from './barcode/barcode.component';
import {MaterialModule} from '../includes/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent,BarcodeComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPrintModule,
    NgxBarcodeModule
  ]
})
export class ProductModule { }
