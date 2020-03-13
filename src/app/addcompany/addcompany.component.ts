import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {
  public newloader: boolean = false;
  public add_company: object = {};
  public address: any;
  public loader: boolean = false;
  public addloader: boolean = false;
  public company_det:any=[];
  constructor(public api: ApiService,public spinner:NgxSpinnerService) { 
    spinner.show();
  }
  

  ngOnInit() {
    
  }

  Addcompany(f: NgForm) {
    console.log(f.value, "add company")
    this.addloader = true;
    this.api.addcompany(f.value).then(res =>{
      console.log(res,"console.log add company")
      if (res == "success") {
        this.addloader = false;
      }
      if(res == "failed"){
        this.addloader = false;
      }
    }).catch(e =>{
      this.addloader = false;
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

  SignDoc(signForm:NgForm) {
    this.loader = true;
    console.log(signForm.value);
    this.loader = true;
  }

  Updatecompany(uf:NgForm){
    this.newloader = true;
    console.log(uf.value, "update company");
    this.api.updatecompany(uf.value).then(res =>{
      console.log(res,"console.log update company")
      if (res == "success") {
        this.newloader = false;
      }
      if(res == "failed"){
        this.newloader = false;
      }
    }).catch(e =>{
      this.newloader = false;
    })
  }
}
