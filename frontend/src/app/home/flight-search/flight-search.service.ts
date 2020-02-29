import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDetails } from './search-details';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  private _airportsGet_url: string = "";
  private _flightSearchPost_url: string = "";
  constructor(private http: HttpClient) { }

  getAirports(){
    this.http.get(this._airportsGet_url);
  }

  postFlightSearch(searchDetails: SearchDetails): Observable<SearchDetails> {
    return this.http.post<SearchDetails>(this._flightSearchPost_url,searchDetails)
  }


}
