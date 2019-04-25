import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier';
import { RestApiService } from 'src/app/service/rest-api.service';
import {ActivatedRoute,Router  } from "@angular/router";
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

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
    this.editForm=this.fb.group({
			'name':[null,Validators.required],
			'code':[null,Validators.required],
      'isActive':[null]

		});
    
  }
  getCatgory(id){
    const url=`supplier/get/${id}`;
    this.restApiService.getAll(url).subscribe(result=>{
      if(result.status==200){
        this.supplier=result.supplier;
        this.editForm.setValue({
          'name':this.supplier.name,
          'code':this.supplier.code,
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
