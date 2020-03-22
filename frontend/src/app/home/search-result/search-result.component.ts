import { Component, OnInit } from '@angular/core';
import { SearchResult } from './search-result';
import { FinalBooking } from './final-booking'
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../data.service';
import { Adult } from './adult';
import { Child } from './child';
import { FlightDateTime } from './flight-datetime';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  flights: SearchResult = new SearchResult();
  finalBooking: FinalBooking = new FinalBooking();
  flightTimeDate: FlightDateTime[] = [];

  constructor(private router: ActivatedRoute, private data: Data) {
  }

  ngOnInit() {

    this.flights = this.data.storage;
    console.log(this.data.storage);
    var d: Date = new Date(this.flights.flights[0].departureTime);
    
    for(var i =0; i< this.flights.flights.length; i++){
      var dateTime: FlightDateTime = new FlightDateTime();
      var tempDepDate = new Date(this.flights.flights[i].departureTime);
      var tempArrDate = new Date(this.flights.flights[i].arrivalTime);
      dateTime.departureDate = dateTime.getDayName(tempDepDate.getDay()) + ','+ dateTime.getMonthName(tempDepDate.getMonth()) + " "+ tempDepDate.getDate() + ","+ tempDepDate.getFullYear();
      dateTime.departureTime = tempDepDate.getHours() + ":" + tempDepDate.toTimeString();
      dateTime.arrivalDate =  dateTime.getDayName(tempArrDate.getDay()) + ','+ dateTime.getMonthName(tempArrDate.getMonth()) + " "+ tempArrDate.getDate() + ","+ tempArrDate.getFullYear();
      dateTime.arrivalTime = tempArrDate.getHours() + ":" + tempArrDate.getMinutes();
      this.flightTimeDate.push(dateTime);
    }

    this.finalBooking.route = this.flights.route;
    this.finalBooking.flights = this.flights.flights;
    this.finalBooking.totalcost = this.flights.totalcost;
    this.finalBooking.adults = [];
    for (var i = 0; i < this.flights.adults; i++) {
      this.finalBooking.adults.push(new Adult(null, null, null, null, null));
    }
    this.finalBooking.children = [];
    for (var i = 0; i < this.flights.children; i++) {
      this.finalBooking.children.push(new Child(null, null, null));
    }
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

}
