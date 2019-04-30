import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router  } from "@angular/router";
@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {

  constructor(private activateRoute:ActivatedRoute,private router:Router){

  }

  ngOnInit() {
  }

}
