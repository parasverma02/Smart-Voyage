import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserAccount } from '../response-objects/user-account';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user = new UserAccount();
  signupForm: FormGroup;
  submitted = false;
  constructor(private _userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    })
    if (this._userService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }
  get f() { return this.signupForm.controls; }

  onSignup() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this._userService.send_signupRequest(this.user)
      .subscribe(response => {
        if(response.message == 'Success'){
          this.router.navigate(['home']);
          this._userService.setLoggedIn(true);
        } else {
          window.alert(response.message);
        }
      });
  }
}
