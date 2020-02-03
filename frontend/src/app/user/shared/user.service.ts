import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from '../response-objects/user-account';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _account_url: string = "/assets/data/account.json";
  private _travellers_url: string = "/assets/data/travellers.json";
  private _sendUser_Post: string = "http://10.32.58.219:3000/api/signup";
  constructor(private http: HttpClient) { }

  sendUser(user: UserAccount): Observable<UserAccount>{
    return this.http.post<UserAccount>(this._sendUser_Post, user);
  }

}
