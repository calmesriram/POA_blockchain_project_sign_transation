import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    // username: [null],
    privatekey: [null]
  });
  constructor(public routes: Router, private fb: FormBuilder, public toster: ToastrService) { }

  ngOnInit(): void {
    // setInterval(()=>{

    // })
  }
  onSubmit() {
    if (this.loginForm.value.privatekey.length < 64) {
      this.toster.error("Invalid privatekey", "Login Status")
      return;
    }
    if (this.loginForm.value.privatekey.length == 65) {
      this.toster.error("Invalid privatekey", "Login Status")
      return;

    }
    if (this.loginForm.value.privatekey.length > 66) {
      this.toster.error("Invalid privatekey", "Login Status")
      return;
    }
    if (this.loginForm.value.privatekey.length == 64) {
      this.loginForm.value.privatekey = "0x" + this.loginForm.value.privatekey
    }

    if (this.loginForm.value.privatekey.length == 66) {
      sessionStorage.setItem("user",this.loginForm.value.privatekey);
      this.routes.navigateByUrl('/dashboard/menu/dashboard')
    }



  }


}
