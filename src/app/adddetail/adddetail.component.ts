import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-adddetail',
  templateUrl: './adddetail.component.html',
  styleUrls: ['./adddetail.component.css']
})
export class AdddetailComponent implements OnInit {
  public add_company: object = {};
  public address: any;
  public loader: boolean = false;
  public company_det:any=[];
  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  Addcompany(f: NgForm) {
    console.log(f.value, "add company")
    this.loader = true;
    this.api.addcompany(f.value).then(res =>{
      console.log(res,"console.log add company")
      if (res == "success") {
        this.loader = false;
      }
      if(res == "failed"){
        this.loader = false;
      }
    }).catch(e =>{
      this.loader = false;
    })
  }
  getaddressid() {
    this.api.getaddressid(this.address).then((res) =>{
      console.log(res,"JAI*************")
      this.company_det = res;
      let myDate = new Date( (res['startDate']) *1000);      
      this.company_det["startDate"]=(myDate.toLocaleString());    

    }).catch(e=>{
      console.log(e);
      
    })
  }
  Updatecompany(uf:NgForm){
    this.loader = true;
    console.log(uf.value, "update company");
    this.api.updatecompany(uf.value).then(res =>{
      console.log(res,"console.log update company")
      if (res == "success") {
        this.loader = false;
      }
      if(res == "failed"){
        this.loader = false;
      }
    }).catch(e =>{
      this.loader = false;
    })
  }
}
