import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userdetails } from './userdetails';
@Injectable({
  providedIn: 'root'
})
export class ProfilepageService {

  private edittravellerdet_url: string = "http://192.168.0.42:3000/api/cityinfo";
  private gettravellerlisturl: string = "http://192.168.0.42:3000/api/cityinfo";
  private _addtravellerPost_url: string = "http://192.168.0.42:3000/api/search";
  private _removetraveller_url: string = "http://192.168.0.42:3000/api/search";
  private _getuserdet_url: string = "http://192.168.0.42:3000/api/search";
  private _getcurrentflights_url: string = "http://192.168.0.42:3000/api/search";
  private _getpastflights_url: string = "http://192.168.0.42:3000/api/search";

  constructor(private http: HttpClient) { }

  gettravellerlist(){
   return this.http.get(this.gettravellerlisturl);
  }

  addnewtravller(newtravllerdet: Userdetails): Observable<Userdetails> {
    return this.http.post<Userdetails>(this._addtravellerPost_url,newtravllerdet);
  }

  edittravller(editdet: Userdetails): Observable<Userdetails> {
    return this.http.post<Userdetails>(this.edittravellerdet_url,editdet);
  }

  removetravller(id){
    return this.http.post(this._removetraveller_url,id);
  }
  getuserdetails(){
    return this.http.get(this._getuserdet_url);
  }
  getcurrflights(){
    return this.http.get(this._getcurrentflights_url);
  }
  getpastflights(){
    return this.http.get(this._getpastflights_url);
  }

}
