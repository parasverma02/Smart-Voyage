import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinalBooking } from './final-booking';
import { Observable } from 'rxjs';
import { url } from '../../../config';
@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  private _finalbookingPost_url: string = url + "confirmbooking";
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
  
  postBookingDetails(finalBooking: FinalBooking): Observable<any> {
    return this.http.post<any>(this._finalbookingPost_url,finalBooking);
  }

}
