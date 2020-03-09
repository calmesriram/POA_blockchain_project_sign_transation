import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { NgForm } from '@angular/forms';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-adddetail',
  templateUrl: './adddetail.component.html',
  styleUrls: ['./adddetail.component.css']
})
export class AdddetailComponent implements OnInit {
  public add_company: object = {};
  public address: any;
  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  Addcompany(f: NgForm) {
    console.log(f.value, "add company")
    this.api.addcompany(f.value)
  }
  getaddressid() {
    this.api.getaddressid(this.address)
  }
}
