import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { UserLogin } from '../response-objects/user-login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user = new UserLogin();
  signinForm : FormGroup;
  submitted = false;
  constructor(private _userService : UserService,private router : Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(6)]]
    })


    if(this._userService.isLoggedIn()){
      this.router.navigate(['home']);
    }
  }
  get f() { return this.signinForm.controls; }

  onSignin(){
    this.submitted = true;        
        if (this.signinForm.invalid) {
            return;
        }

    console.log(this.user);
    this._userService.send_loginRequest(this.user)
    .subscribe(response => {
      if(response.success){
        this.router.navigate(['home']);
        localStorage.setItem("loggedInUsername",this.user.username);
        this._userService.setLoggedIn(true);
      } else {
        window.alert(response.message);
      }
    });
  }

}
