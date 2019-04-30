import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { BarcodeComponent } from './barcode/barcode.component';
const routes: Routes = [
  {path:'',component:ListComponent},
  {path:'add',component:AddComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'barcode/:code/:sp/:noofitems/:noofitemsleft',component:BarcodeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
