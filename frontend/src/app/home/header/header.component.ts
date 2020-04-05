import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../search-result/search-result.service';
import { UserService } from 'src/app/user/shared/user.service';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private resultService: SearchResultService,private _userService: UserService) { }

  ngOnInit() {
    
  }
  onLogout(){
    this._userService.Logout();
  }

}
