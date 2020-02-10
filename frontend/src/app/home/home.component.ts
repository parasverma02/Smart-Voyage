import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit() {
  }

  onLogout(){
    console.log('in logout');
    localStorage.removeItem('loggedIn');
    this._userService.setLoggedIn(false);
    console.log(localStorage.getItem('loggedIn'));
    this.router.navigate(['login']);
  }

}
