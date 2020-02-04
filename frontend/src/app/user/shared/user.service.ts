import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from '../response-objects/user-account';
import { UserLogin } from '../response-objects/user-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _account_url: string = "/assets/data/account.json";
  private _travellers_url: string = "/assets/data/travellers.json";
  private _sendNewUser_Post: string = "http://192.168.0.88:3000/api/signup";
  private _sendLogin_post: string = "http://192.168.0.88:3000/api/signin";
  constructor(private http: HttpClient) { }

  send_signupRequest(user: UserAccount): Observable<UserAccount>{
    return this.http.post<UserAccount>(this._sendNewUser_Post, user);
  }
  
  send_loginRequest(user: UserLogin ): Observable<UserLogin>{
    return this.http.post<UserLogin>(this._sendLogin_post, user);
  }

}
