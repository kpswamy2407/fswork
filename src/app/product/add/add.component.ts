import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {RestApiService} from '../../service/rest-api.service';
import {Size} from '../../size/size';
import {Supplier} from '../../supplier/supplier';
import {Category} from '../../category/category';
import {Brand} from '../../brand/brand';
import {Router} from '@angular/router';
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
  constructor(private fb: FormBuilder,private restApiService: RestApiService,private router: Router) {
  	this.getSizes();
  	this.getBrands();
  	this.getCategories();
  	this.getSuppliers();
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
    ngOnInit() {
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
   add(){

    this.submitted=true;
    this.showSpinner=true;
    this.hasError=false;
    this.isOpCompleted=false;
    if(this.addForm.valid){

      this.restApiService.postData('product/create',this.addForm.value).subscribe(result=>{
        if(result.status==200){
          this.isOpCompleted=true;
          this.successMessage=result.message;
          this.router.navigate(['product'])
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
}
