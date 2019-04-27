import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {RestApiService} from '../../service/rest-api.service';
import {Size} from '../../size/size';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  sizes: Size[];
  constructor(private fb: FormBuilder,private restApiService: RestApiService) { }

  ngOnInit() {
  }

}
