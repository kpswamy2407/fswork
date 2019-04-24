import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { RestApiService } from 'src/app/service/rest-api.service';
import {ActivatedRoute  } from "@angular/router";
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  category: Category;
  selectedId: number;
  errorMessage: string;
  hasError: Boolean;
  editForm: FormGroup;
  showSpinner: Boolean;
  isOpCompleted: Boolean;
  constructor(private restApiService: RestApiService,private router: ActivatedRoute,private fb: FormBuilder) { }

  ngOnInit() {
    this.selectedId=this.router.snapshot.params['id'];
    this.getCatgory(this.selectedId);
    this.editForm=this.fb.group({
			'name':[null,Validators.required],
			'code':[null,Validators.required],
      'isActive':[null]

		});
    
  }
  getCatgory(id){
    const url=`category/get/${id}`;
    this.restApiService.getAll(url).subscribe(result=>{
      if(result.status==200){
        this.category=result.category;
        this.editForm.setValue({
          'name':this.category.name,
          'code':this.category.code,
          'isActive':this.category.isActive
        })
      }
      else{
        this.errorMessage="No category is exists with provided input."
        this.hasError=true;
      }
    })
  }
  edit(id){
    console.log(this.editForm.value);
  }

}
