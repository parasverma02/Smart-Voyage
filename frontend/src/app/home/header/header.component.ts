import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../search-result/search-result.service';
import { UserService } from 'src/app/user/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private resultService: SearchResultService,private _userService: UserService) { }

  ngOnInit() {
    
  }
  onLogout(){
    this._userService.Logout();
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
