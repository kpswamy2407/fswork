import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
const routes: Routes = [
  {path:'categories',component:ListComponent},
  {path:'category/add',component:AddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
