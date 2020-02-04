import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserAccount } from '../response-objects/user-account';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user = new UserAccount();
  constructor(private _userService: UserService) { }
  
  ngOnInit() {
  }

  onSignup(){
    console.log(this.user);
    this._userService.send_signupRequest(this.user)
    .subscribe(response => console.log('sucess!',response));
  }
}
