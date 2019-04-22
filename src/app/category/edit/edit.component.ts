import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { RestApiService } from 'src/app/service/rest-api.service';
import {ActivatedRoute  } from "@angular/router";

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
  constructor(private restApiService: RestApiService,private router: ActivatedRoute) { }

  ngOnInit() {
    this.selectedId=this.router.snapshot.params['id'];
    this.getCatgory(this.selectedId);
    
  }
  getCatgory(id){
    const url=`category/get/${id}`;
    this.restApiService.getAll(url).subscribe(result=>{
      if(result.status==200){
        this.category=result.category;
      }
      else{
        this.errorMessage="No category is exists with provided input."
        this.hasError=true;
      }
    })
  }

}
