import { Component, OnInit } from '@angular/core';
import { SearchDetails } from './search-details';
import { FlightSearchService } from './flight-search.service';
import { Router} from '@angular/router';
import { Data } from '../data.service'
import { Airports } from './airports';
import { SearchResult } from '../search-result/search-result';
import { SearchResultService } from '../search-result/search-result.service';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  private airports = new Airports();
  flights: SearchResult = new SearchResult();
  private citiesNumber = [1];
  searchDetails = new SearchDetails(null,new Date(),[{city:null,days:null}], 1, 0);
  private cityNumber = 1;
  private adult_count = 1;
  private children_count = 0;
  constructor(private _flightService: FlightSearchService, private router: Router, private data: Data) { }
  ngOnInit() {
    this.getAirports();
  }

  getAirports(){
    this._flightService.getAirports().subscribe((data: Airports)=> {
      this.airports = data;
    })
  }
   
  onSubmit(){
    this._flightService.postFlightSearch(this.searchDetails).subscribe((response: SearchResult) => {
      this.flights.route = response['route'];
      console.log(this.flights.route);
      console.log(response);
    });
    this.router.navigate(['searchresult']);
    
  }
  onAdd(){
    this.cityNumber++;
    this.searchDetails.cities.push({city:null,days:null});
    this.citiesNumber.push(this.citiesNumber.length + 1);
    console.log(this.searchDetails);
  }
  removeCity(id:number){

    this.citiesNumber = Array(this.citiesNumber.length-1).fill(0).map((x,i)=>i+1);
    this.searchDetails.cities.splice(id,1);
    console.log(this.searchDetails);
    
  }
  onIncrementAdult(){
    this.adult_count++;
    this.searchDetails.updateAdults(this.adult_count);

  }
  onDecrementAdult(){
    this.adult_count--;
    this.searchDetails.updateAdults(this.adult_count);

  }
  onIncrementChildren(){
    this.children_count++;
    this.searchDetails.updateChildren(this.children_count);

  }
  onDecrementChildren(){
    this.children_count--;
    this.searchDetails.updateChildren(this.children_count);

  }
}
