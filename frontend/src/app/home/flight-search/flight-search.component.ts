import { Component, OnInit } from '@angular/core';

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
  private cities = [
    "City1",
  ]
  private cityNumber = 1;
  private adult_count = 1;
  private children_count = 0;
  constructor() { }
  ngOnInit() {
  }
   
  onAdd(){
    this.cityNumber++;
    this.cities.push("City"+this.cityNumber);
    
  }
  onIncrementAdult(){
    this.adult_count++;

  }
  onDecrementAdult(){
    this.adult_count--;
  }
  onIncrementChildren(){
    this.children_count++;
  }
  onDecrementChildren(){
    this.children_count--;
  }
}
