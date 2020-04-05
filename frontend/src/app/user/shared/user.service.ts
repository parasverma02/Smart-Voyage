import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from '../response-objects/user-account';
import { UserLogin } from '../response-objects/user-login';
import { url } from "../../../config";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  private _sendNewUser_Post: string = url + "signup";
  private _sendLogin_post: string = url + "signin";
  constructor(private http: HttpClient,private router: Router) { }
  
  setLoggedIn(value: boolean){
    localStorage.setItem('loggedIn',String(value));
    this.loggedInStatus = value;
  }
  isLoggedIn(): boolean{
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }
  Logout(){
    console.log('in logout');
    localStorage.removeItem('loggedIn');
    this.setLoggedIn(false);
    console.log(localStorage.getItem('loggedIn'));
    this.router.navigate(['login']);
  }
  send_signupRequest(user: UserAccount): Observable<any>{
    return this.http.post<any>(this._sendNewUser_Post, user);
  }
  
  send_loginRequest(user: UserLogin ): Observable<any>{
    return this.http.post<any>(this._sendLogin_post, user);
  }

}
