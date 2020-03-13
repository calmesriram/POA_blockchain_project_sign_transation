import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-ipfsfile',
  templateUrl: './ipfsfile.component.html',
  styleUrls: ['./ipfsfile.component.css']
})
export class IpfsfileComponent implements OnInit {
  displayfilename: String = "";
  selectedFile: File = null;
  hash: any;
  ipfsfile_details:String="";
  showitem: boolean = false;
  fd = new FormData();
  url;
  uploadloader: boolean = false;
  displayphoto:boolean=false;
  uploadfiledetails: any = [];
  constructor(public api: ApiService) { }

  ngOnInit() {
  }




  choose(event) {
    this.url = "";
    this.displayfilename = "";

    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);

    // console.log(this.selectedFile, this.selectedFile.name)
    this.displayfilename = this.selectedFile.name;
    if (this.selectedFile.name.split('.')[1] == "jpeg" || this.selectedFile.name.split('.')[1] == "png") {
      this.displayphoto = true;
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed        
          this.url = event.target.result;
          // console.log(this.url)   
        }
      }
    }
  }
  getfile(hash) {
    this.ipfsfile_details = hash;
    // return;
    // this.api.getfile(hash).then(data =>{
    //   console.log(data);
    //   this.ipfsfile_details = data;
    // })
  }
  submitfile() {
    this.showitem = true;
    this.uploadloader = true;
    this.api.sendfile(this.fd).then(res => {
      if (res) {
        this.uploadfiledetails = res;
        this.uploadloader = false;
      }
    }).catch(e => {
      this.uploadloader = false;
      console.log(e)
    })
  }





}
