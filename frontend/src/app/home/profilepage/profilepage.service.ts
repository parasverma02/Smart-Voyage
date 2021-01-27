import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userdetails } from './userdetails';
import { url } from "../../../config"

@Injectable({
  providedIn: 'root'
})
export class ProfilepageService {

  private edittravellerdet_url: string = url + "edittraveller";
  private gettravellerlisturl: string = url + "travellerlist";
  private _addtravellerPost_url: string = url + "addtraveller";
  private _removetraveller_url: string = url + "removetraveller";
  private _getuserdet_url: string = url + "search";
  private _getcurrentflights_url: string = url + "upcomingbookings";
  private _getpastflights_url: string = url + "pastbookings";
  username:any;

  constructor(private http: HttpClient) { }


  gettravellerlist(){
    this.username=localStorage.getItem("loggedInUsername")

   return this.http.get(this.gettravellerlisturl+"/"+this.username);
  }

  addnewtravller(newtravllerdet: Userdetails): Observable<any> {
    let newtravellerjson:any;
    this.username=localStorage.getItem("loggedInUsername")
    let header= new HttpHeaders();
    header.append('Content-Type', 'application/json');
    newtravellerjson={"username":this.username,"travellers":[newtravllerdet]};
    console.log(newtravellerjson);
    return this.http.post<Userdetails>(this._addtravellerPost_url,newtravellerjson,{headers:header});
  }

  edittravller(editdet: Userdetails): Observable<any> {
    let edittravellerjson:any;
    this.username=localStorage.getItem("loggedInUsername")
    let header= new HttpHeaders();
    header.append('Content-Type', 'application/json');
    edittravellerjson={"username":this.username,"travellers":[editdet]};
    console.log(edittravellerjson);
    return this.http.post<Userdetails>(this.edittravellerdet_url,edittravellerjson);
  }

  removetravller(userfirstname){
    let removetravellerjson:any;
    this.username=localStorage.getItem("loggedInUsername")
    let header= new HttpHeaders();
    header.append('Content-Type', 'application/json');
    removetravellerjson={"username":this.username,"firstname":userfirstname};
    console.log(removetravellerjson);
    return this.http.post(this._removetraveller_url,removetravellerjson);
  }
  getuserdetails(){
    return this.http.get(this._getuserdet_url);
  }
  getcurrflights(){
    this.username=localStorage.getItem("loggedInUsername")

    return this.http.get(this._getcurrentflights_url+"/"+this.username);
  }
  getpastflights(){
    this.username=localStorage.getItem("loggedInUsername")

    return this.http.get(this._getpastflights_url+"/"+this.username);
  }

}
