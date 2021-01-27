import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user/shared/user.service';
import { SearchResultService } from './home/search-result/search-result.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserService, private router: Router,private resultService: SearchResultService){

  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.userService.isLoggedIn()){
      this.router.navigate(['login']);
      return false;
    }
      return this.userService.isLoggedIn();
  }
  
  canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      return this.resultService.isResultAccessible();
  }
}
