import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router  } from "@angular/router";
import {RestApiService} from '../../service/rest-api.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {

  code: String;
  sp: Number;
  noofItems: Number;
  noofItemsLeft: Number;
  /*:code/:sp/:noofitems/:noofitemsleft*/
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private restApiService: RestApiService,private location: Location){

  }

  ngOnInit() {
  	this.code=this.activatedRoute.snapshot.params['code'];
  	this.sp=this.activatedRoute.snapshot.params['sp'];
  	this.noofItems=this.activatedRoute.snapshot.params['noofitems'];
  	this.noofItemsLeft=this.activatedRoute.snapshot.params['noofitemsleft'];
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
     items.push(i);
   }
   return items;
  }
  getRandomNumber(){
    var result           = '';
    var characters       = 'zxcvbnmlkj01234567899876543';
    var charactersLength = characters.length;
    for ( var i = 0; i < 3; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  goBack(){
    this.location.back();
  }
}
