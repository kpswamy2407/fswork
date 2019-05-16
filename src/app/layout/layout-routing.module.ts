import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout.component';
import { AuthGuard } from '../auth/auth.guard';
const routes: Routes = [
	{
			path: '',
			component: LayoutComponent,
			children: [
				   {
							path: '',
							redirectTo: 'dashboard',
							
					},
					{
							path: 'dashboard',
							loadChildren: '../dashboard/dashboard.module#DashboardModule',
							
						
							
					},
				
					{
							path: 'category',
							loadChildren: '../category/category.module#CategoryModule',
							//canLoad: [AuthGuard]
					},
					{
						path: 'brand',
						loadChildren: '../brand/brand.module#BrandModule',
						//canLoad: [AuthGuard]
					},
					{
						path: 'supplier',
						loadChildren: '../supplier/supplier.module#SupplierModule',
						//canLoad: [AuthGuard]
					},
					{
						path: 'product',
						loadChildren: '../product/product.module#ProductModule',
						//canLoad: [AuthGuard]
					},
					{
						path: 'sale',
						loadChildren: '../sale/sale.module#SaleModule',
						//canLoad: [AuthGuard]
					},
					{
						path: 'size',
						loadChildren: '../size/size.module#SizeModule',
						//canLoad: [AuthGuard]
				}
			]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule { }
