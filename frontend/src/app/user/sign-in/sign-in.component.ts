import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { UserLogin } from '../response-objects/user-login';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user = new UserLogin();
  constructor(private _userService : UserService,private router : Router) { }

  ngOnInit() {
    if(this._userService.isLoggedIn){
      this.router.navigate(['home']);
    }
  }

  onSignin(){
    console.log(this.user);
    this._userService.send_loginRequest(this.user)
    .subscribe(response => {
      if(response.success){
        this.router.navigate(['home']);
        this._userService.setLoggedIn(true);
      } else {
        window.alert(response.message);
      }
    });
  }

}
