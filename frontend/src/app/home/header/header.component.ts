import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/shared/user.service';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
  navigate(pagename:any){
    this.router.navigate(['profilepage'],{state:pagename});

  }
}
