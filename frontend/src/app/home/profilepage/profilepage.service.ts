import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userdetails } from './userdetails';

@Injectable({
  providedIn: 'root'
})
export class ProfilepageService {

  private edittravellerdet_url: string = "http://localhost:3000/api/edittraveller";
  private gettravellerlisturl: string = "http://localhost:3000/api/travellerlist";
  private _addtravellerPost_url: string = "http://localhost:3000/api/addtraveller";
  private _removetraveller_url: string = "http://localhost:3000/api/removetraveller";
  private _getuserdet_url: string = "http://localhost:3000/api/search";
  private _getcurrentflights_url: string = "http://localhost:3000/api/upcomingbookings";
  private _getpastflights_url: string = "http://localhost:3000/api/pastbookings";
  username:any;

  constructor(private http: HttpClient) { }


  gettravellerlist(){
    this.username=localStorage.getItem("loggedInUsername")

   return this.http.get(this.gettravellerlisturl+"/"+this.username);
  }

  addnewtravller(newtravllerdet: Userdetails): Observable<Userdetails> {
    let newtravellerjson:any;
    this.username=localStorage.getItem("loggedInUsername")
    let header= new HttpHeaders();
    header.append('Content-Type', 'application/json');
    newtravellerjson={"username":this.username,"travellers":[newtravllerdet]};
    console.log(newtravellerjson);
    return this.http.post<Userdetails>(this._addtravellerPost_url,newtravellerjson,{headers:header});
  }

  edittravller(editdet: Userdetails): Observable<Userdetails> {
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
