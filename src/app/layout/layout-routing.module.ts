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
							canActivateChild:[AuthGuard],
							loadChildren: '../dashboard/dashboard.module#DashboardModule'
							
					},
				
					{
							path: 'category',
							canActivateChild:[AuthGuard],
							loadChildren: '../category/category.module#CategoryModule'
							
					},
					{
						path: 'brand',
						canActivateChild:[AuthGuard],
						loadChildren: '../brand/brand.module#BrandModule'
						//canLoad: [AuthGuard]
					},
					{
						path: 'supplier',
						canActivateChild:[AuthGuard],
						loadChildren: '../supplier/supplier.module#SupplierModule'
						//canLoad: [AuthGuard]
					},
					{
						path: 'product',
						canActivateChild:[AuthGuard],
						loadChildren: '../product/product.module#ProductModule'
						//canLoad: [AuthGuard]
					},
					{
						path: 'sale',
						canActivateChild:[AuthGuard],
						loadChildren: '../sale/sale.module#SaleModule'
						//canLoad: [AuthGuard]
					},
					{
						path: 'size',
						canActivateChild:[AuthGuard],
						loadChildren: '../size/size.module#SizeModule'
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
