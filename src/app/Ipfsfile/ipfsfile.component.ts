import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-ipfsfile',
  templateUrl: './ipfsfile.component.html',
  styleUrls: ['./ipfsfile.component.css']
})
export class IpfsfileComponent implements OnInit {
  displayfilename:String="";
  selectedFile: File = null;
  fd = new FormData();
  url;
  constructor(public api:ApiService) { }

  ngOnInit() {
  }


  choose(event) {
    this.url = "";
    this.displayfilename="";
    console.log(event.target.files[0])
    console.log(event.target.files[0].name)
    this.displayfilename = event.target.files[0].name;
    this.selectedFile = <File>event.target.files[0];

    this.fd.append('file', this.selectedFile, this.selectedFile.name);
 console.log(this.selectedFile,this.selectedFile.name)
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result; 
        // this.api.sendfile(this.url)       
      }
    }
  }
}
