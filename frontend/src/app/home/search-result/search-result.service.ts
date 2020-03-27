import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  private _airportsGet_url: string = "http://10.34.126.31:3000/api/cityinfo";
  private _flightSearchPost_url: string = "http://10.34.126.31:3000/api/search";
  constructor(private http: HttpClient) { }

  giveAccessToResul(){
    localStorage.setItem("access",String(true));
  }
  isResultAccessible(){
    return localStorage.getItem("access") !=null;
  }
  removeAccessToResult(){
    localStorage.removeItem("access")
  }
  

}
