import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {RestApiService} from '../../service/rest-api.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	addForm:FormGroup;
	showSpinner:boolean;
	constructor(private fb:FormBuilder,private restApiService:RestApiService) {
		this.addForm=this.fb.group({
			'name':[null,Validators.required],
			'code':[null,Validators.required],
			'is_active':[null,Validators.required]
		});
	}

	ngOnInit() {
  	}

  	add(){
  		if(this.addForm.valid){

  			this.restApiService.postData('category/create',this.addForm.value).subscribe(result=>{
  				console.log(result);
  			})
  		}
  		else{

  		}

  	}

}
