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
  noofitemsleft: Number;
  /*:code/:sp/:noofitems/:noofitemsleft*/
  constructor(private activatedRoute:ActivatedRoute,private router:Router){

  }

  ngOnInit() {
  	this.code=this.activatedRoute.snapshot.params['code'];
  	this.sp=this.activatedRoute.snapshot.params['sp'];
  	this.noofitems=this.activatedRoute.snapshot.params['noofitems'];
  	this.noofitemsleft=this.activatedRoute.snapshot.params['noofitemsleft'];
  }
  elementType = 'svg';
  value = 'someValue12340987';
  format = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 100;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

}
