import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  public add_company: object = {};
  public address: any;
  public individualaddress:any;
  public addloader: boolean = false;
  public loader: boolean = false;
  public company_det:any=[];
  public individual_det:any=[];
  constructor(public api: ApiService) { }

  ngOnInit() {
  }
  
  AddEmployee(f: NgForm) {
    console.log(f.value, "add individual")    
    this.addloader = true;
    this.api.addemployee(f.value).then(res =>{
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
  getindividualdetails(){  
  this.api.getindividualDetails(this.individualaddress).then(res =>{
    console.log(res);
    this.individual_det = res;
    let myDate = new Date( (res['startDate']) *1000);      
    this.individual_det["startDate"]=(myDate.toLocaleString());  
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
  updateemployee(uf:NgForm){
    this.loader = true;
    console.log(uf.value, "update employee");
    this.api.updateemployee(uf.value).then(res =>{
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
