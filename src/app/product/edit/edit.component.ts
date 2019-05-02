import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { RestApiService } from 'src/app/service/rest-api.service';
import {ActivatedRoute,Router  } from "@angular/router";
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Size} from '../../size/size';
import {Supplier} from '../../supplier/supplier';
import {Category} from '../../category/category';
import {Brand} from '../../brand/brand';
@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

	supplier: Supplier;
	selectedId: number;
	errorMessage: string;
	hasError: Boolean;
	editForm: FormGroup;
	showSpinner: Boolean;
	isOpCompleted: Boolean;
	successMessage: string;
	constructor(private restApiService: RestApiService,private activatedRoute: ActivatedRoute,private fb: FormBuilder, private router: Router) { }

	ngOnInit() {
		this.selectedId=this.activatedRoute.snapshot.params['id'];
		this.getCatgory(this.selectedId);
			this.addForm=this.fb.group({
		    'categoryId':[null,Validators.required],
		    'sizeId':[null,Validators.required],
		    'supplierId':[null,Validators.required],
		    'brandId':[null,Validators.required],
		    'buyingPrice':[null,Validators.required],
		    'sellingPrice':[null,Validators.required],
		    'noOfItems':[null,Validators.required]
		  });

	}
	getSizes(){
		this.restApiService.getAll('size/getAll').subscribe(result=>{
			if(result.status==200){
				this.sizes=result.sizes;
			}
			else{
				this.sizes=[];
			}
		});
	}
	getBrands(){
		this.restApiService.getAll('brand/getAll').subscribe(result=>{
			if(result.status==200){
				this.brands=result.brands;
			}
			else{
				this.brands=[];
			}
		});
	}
	getCategories(){
		this.restApiService.getAll('category/getAll').subscribe(result=>{
			if(result.status==200){
				this.categories=result.categories;
			}
			else{
				this.categories=[];
			}
		});
	}
	getSuppliers(){
		this.restApiService.getAll('supplier/getAll').subscribe(result=>{
			if(result.status==200){
				this.suppliers=result.suppliers;
			}
			else{
				this.suppliers=[];
			}
		});
	}
	getProduct(id){
		const url=`product/get/${id}`;
		this.restApiService.getAll(url).subscribe(result=>{
			if(result.status==200){
				this.product=result.product;
				this.editForm.setValue({
					'name':this.supplier.name,
					'code':this.supplier.code,
					'phone':this.supplier.phone,
					'address':this.supplier.address,
					'isActive':this.supplier.isActive
				})
			}
			else{
				this.errorMessage="No supplier is exists with provided input."
				this.hasError=true;
			}
		})
	}
	edit(id){

		this.showSpinner=true;
		this.hasError=false;
		this.isOpCompleted=false;
		if(this.editForm.valid){

			this.restApiService.updateData('supplier/update',this.editForm.value,id).subscribe(result=>{
				if(result.status==200){
					this.isOpCompleted=true;
					this.successMessage=result.message;
					this.router.navigate(['supplier'])
				}else{
					this.hasError=true
					this.errorMessage=result.error;
				}
				this.showSpinner=false;


			})
		}
		else{
			this.showSpinner=false;
		}
	}

}
