import { Component, OnInit } from '@angular/core';
import { SearchDetails } from './search-details';
import { FlightSearchService } from './flight-search.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Data } from '../data.service'
import { Airports } from './airports';
import { SearchResult } from '../search-result/search-result';
import { SearchResultService } from '../search-result/search-result.service';
import { appRoutes } from '../../app.routing';
@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  private airports = new Airports();
  flights: SearchResult = new SearchResult();
  private citiesNumber = [1];
  searchDetails = new SearchDetails(null,'Economy',new Date(),[{city:null,days:null}], 1, 0);
  private cityNumber = 1;
  private adult_count = 1;
  private children_count = 0;
  constructor(private resultService: SearchResultService, private _flightService: FlightSearchService, private router: Router, private data: Data, private routes: ActivatedRoute) { }
  ngOnInit() {
    this.getAirports();
    this.resultService.removeAccessToResult();
  }

  getAirports(){
    this._flightService.getAirports().subscribe((data: Airports)=> {
      this.airports = data;
    })
  }
   
  onSubmit(){
    this._flightService.postFlightSearch(this.searchDetails).subscribe(response => {
      this.data.storage = response;
      this.resultService.giveAccessToResul();
      this.router.navigate(['searchresult']);
    });
    
    
  }
  onAdd(){
    this.cityNumber++;
    this.searchDetails.cities.push({city:null,days:null});
    this.citiesNumber.push(this.citiesNumber.length + 1);
  }
  removeCity(id:number){

    this.citiesNumber = Array(this.citiesNumber.length-1).fill(0).map((x,i)=>i+1);
    this.searchDetails.cities.splice(id,1);
    
    
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
