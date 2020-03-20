import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  private _airportsGet_url: string = "http://10.34.126.31:3000/api/cityinfo";
  private _flightSearchPost_url: string = "http://10.34.126.31:3000/api/search";
  constructor(private http: HttpClient) { }

  // getFlights(){
  //  return this.http.get(this._airportsGet_url);
  // }

  // postFlightSearch(searchDetails: SearchDetails): Observable<SearchDetails> {
  //   return this.http.post<SearchDetails>(this._flightSearchPost_url,searchDetails)
  // }

}
