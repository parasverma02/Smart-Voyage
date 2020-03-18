import { Component, OnInit } from '@angular/core';
import { SearchResult } from './search-result';
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  flights: SearchResult = new SearchResult();
  private flightroute = [
    "New Delhi",
    "Toronto",
    "Mumbai",
    "dubai",
    "China",
    "Japan"
  ]
  constructor(private router: ActivatedRoute,private data: Data) { }

  ngOnInit() {

      
      
      // console.log(this.data.storage['route']);
      // this.flights = this.data.storage;
      
      // this.flights.route = this.data.storage.route;
      // console.log(this.flights.route);

    this.flights.route = [ "Montreal","Toronto","Vancouver"];
    this.flights.totalcost = 1500;
    this.flights.adults = 1;
    this.flights.children = 0;
    this.flights.flights = [
      {
        source : "Montreal",
        destination: "Toronto",
        departureAirportFsCode:"YUL",
        arrivalAirportFsCode: "YYZ",
        totalFlightTime: "14h 30m",
        departureTime: new Date("2020-04-04T03:00:00.000"),
        arrivalTime: new Date("2020-04-04T03:00:00.000"),
        flightcost: 700,
        carrierFsCode: "ACA",
        flightNumber: 100,
        stops: 0
        
      },
      {
        source : "Toronto",
        destination: "Vancouver",
        departureAirportFsCode:"YYZ",
        arrivalAirportFsCode: "YVR",
        totalFlightTime: "14h 30m",
        departureTime: new Date("2020-04-04T03:00:00.000"),
        arrivalTime: new Date("2020-04-04T03:00:00.000"),
        flightcost: 800,
        carrierFsCode: "ACA",
        flightNumber: 121,
        stops: 0
        
      },
    ];
  }

}
