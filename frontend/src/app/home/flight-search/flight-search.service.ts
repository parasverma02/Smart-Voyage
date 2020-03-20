import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDetails } from './search-details';
import { Observable } from 'rxjs';
import { SearchResult } from '../search-result/search-result';
@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  private _airportsGet_url: string = "http://192.168.0.42:3000/api/cityinfo";
  private _flightSearchPost_url: string = "http://192.168.0.42:3000/api/search";
  constructor(private http: HttpClient) { }

  getAirports(){
   return this.http.get(this._airportsGet_url);
  }

  postFlightSearch(searchDetails: SearchDetails): Observable<SearchResult> {
    return this.http.post<SearchResult>(this._flightSearchPost_url,searchDetails);
  }


}
