import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
	{
			path: '',
			component: LayoutComponent,
			children: [
				 /*  {
							path: '',
							redirectTo: 'dashboard'
					},
					{
							path: 'dashboard',
							loadChildren: './dashboard/dashboard.module#DashboardModule'
					},
				*/
					{
							path: 'category',
							loadChildren: '../category/category.module#CategoryModule'
					},
					{
						path: 'brand',
						loadChildren: '../brand/brand.module#BrandModule'
					},
					{
						path: 'supplier',
						loadChildren: '../supplier/supplier.module#SupplierModule'
					},
					{
						path: 'product',
						loadChildren: '../product/product.module#ProductModule'
					},
				/*	{
						path: 'sale',
						loadChildren: '../sale/sale.module#SaleModule'
					},*/
					{
						path: 'size',
						loadChildren: '../size/size.module#SizeModule'
				}
			]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule { }
