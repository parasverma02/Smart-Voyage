import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchResultService } from './home/search-result/search-result.service';

@Injectable({
  providedIn: 'root'
})
export class ResultGuard implements CanActivate{

  constructor(private router: Router,private resultService: SearchResultService){

  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      if(!this.resultService.isResultAccessible()){
        this.router.navigate(['home']);
        console.log('not accessisble');
        return false;
      }
        return this.resultService.isResultAccessible();
  }
}