import { Component, OnInit } from '@angular/core';
import { SearchDetails } from './search-details';
import { FlightSearchService } from './flight-search.service';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  private items = [
    "mumbai",
    "toronto",
    "delhi",
  ]
  private citiesNumber = [1]
  searchDetails = new SearchDetails(null,new Date(),[{city:null,days:null}], 1, 0);
  private cityNumber = 1;
  private adult_count = 1;
  private children_count = 0;
  constructor(private _flightService: FlightSearchService) { }
  ngOnInit() {
    this.getAirports();
  }

  getAirports(){
  }
   
  onSubmit(){
    console.log(this.searchDetails);
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
