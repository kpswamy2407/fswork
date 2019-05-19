import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';
import {RestApiService} from '../../service/rest-api.service';
import {Size} from '../../size/size';
import {Supplier} from '../../supplier/supplier';
import {Category} from '../../category/category';
import {Brand} from '../../brand/brand';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	addForm: FormGroup;
	sizes: Size[];
	suppliers: Supplier[];
	categories: Category[];
	brands: Brand[];
	showSpinner: Boolean;
	isOpCompleted: Boolean;
	hasError: Boolean;
	errorMessage: String;
	successMessage: String;
	submitted: Boolean;
	constructor(private fb: FormBuilder,private restApiService: RestApiService,private router: Router, private location: Location) {
		this.addForm=this.fb.group({
			'name':[null],
			'mobile':[null,Validators.required],
			'address':[null],
			'totalAmount':[0,Validators.required],
			'products':fb.array([
				fb.group({
						'code':[null,Validators.required],
						'productId':[null,Validators.required],
						'sellingPrice':[null,Validators.required],
						'discount':[0],
						'amount':[null,Validators.required],
						'quantity':[1,Validators.required],
					})
				]),
		});
	}
	getProductsFormArray(){
		return this.addForm.get('products') as FormArray;
	}
	addProducts(){
		this.getProductsFormArray().push(
			this.fb.group({
				'code':[null,Validators.required],
				'productId':[null,Validators.required],
				'sellingPrice':[null,Validators.required],
				'discount':[0],
				'amount':[null,Validators.required],
				'quantity':[1,Validators.required]
			})
		);
	}
	delProducts(index: number){
		if(this.getProductsFormArray().length>1){
			this.getProductsFormArray().removeAt(index);
			this.updateProductTotalAmount();

		}
	}
	getProduct(group: FormGroup){
		var productCode=group.value.code;
		if(productCode.length>0){
			const url=`product/getbycode/${productCode}`;
			this.restApiService.getAll(url).subscribe(result=>{
			if(result.status==200){
				group.patchValue({
					'productId':result.product.id,
					'sellingPrice':result.product.sellingPrice,
					'amount':result.product.sellingPrice,
				 });
				this.updateProductTotalAmount();
			}
			});
		}
		else{
			this.errorMessage="Enter product code";
		}
			
	}
	updateProduct(group: FormGroup){
		if(parseFloat(group.value.sellingPrice)>0){
			var discount=`${(parseFloat(group.value.discount)/100)*parseFloat(group.value.sellingPrice)}`
			
			group.patchValue({
				'amount':`${parseFloat(group.value.quantity)*(parseFloat(group.value.sellingPrice)-parseFloat(discount))}`
			 });
			this.updateProductTotalAmount();
		}
		
	}
	updateProductTotalAmount(){
		 var totalAmount;
		 totalAmount=0;
		this.getProductsFormArray().value.forEach(product=>{
			totalAmount=`${parseFloat(totalAmount)+parseFloat(product.amount)}`;
		});
		this.addForm.patchValue({
			'totalAmount':`${parseFloat(totalAmount)}`,
		})
	}
	ngOnInit() {
	}
	add(){
		this.submitted=true;
		this.showSpinner=true;
		this.hasError=false;
		this.isOpCompleted=false;
		if(this.addForm.valid){
			this.restApiService.postData('sale/create',this.addForm.value).subscribe(result=>{
				if(result.status==200){
					this.isOpCompleted=true;
					this.successMessage=result.message;
					this.router.navigate(['sale'])
				}else{
					this.hasError=true
					this.errorMessage=result.error;
				}
				this.showSpinner=false;
				this.submitted=false;

			})
		}
		else{
			this.showSpinner=false;
			this.submitted=false;
		}
	}
	getCustomer(){
		var mobile=this.addForm.value.mobile;
		if(mobile.length>0){
			const url=`customer/getbymobile/${mobile}`;
			this.restApiService.getAll(url).subscribe(result=>{

			if(result.status==200){
				this.addForm.setValue({
						'name':result.customer.name,
						'mobile':result.customer.mobile,
						'address':result.customer.address,
						'totalAmount':this.addForm.value.totalAmount,
						'products':this.addForm.value.products,
					})
				}
			})
		}
		
	}
	goBack(){
		this.location.back();
	}
}
