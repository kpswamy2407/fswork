import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router  } from "@angular/router";
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
  constructor(private activatedRoute:ActivatedRoute,private router:Router){

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
}
