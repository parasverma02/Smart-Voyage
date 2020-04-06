import { Component, OnInit, TemplateRef } from '@angular/core';
import { SearchResult } from './search-result';
import { FinalBooking, Flight } from './final-booking'
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../data.service';
import { Adult } from './adult';
import { Child } from './child';
import { FlightDateTime } from './flight-datetime';
import { SearchResultService } from './search-result.service';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FlightSearchComponent } from '../flight-search/flight-search.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  flights: SearchResult = new SearchResult();
  finalBooking: FinalBooking;
  flightTimeDate: FlightDateTime[];
  travellersForms: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private data: Data, private route: Router, private searchService: SearchResultService) {
  }

  ngOnInit() {

    this.finalBooking = new FinalBooking();
    this.finalBooking.username = "pm02";
    this.flightTimeDate = [];
    if (this.data.storage != null) {
      this.flights = this.data.storage;
      var d: Date = new Date(this.flights.flights[0].departureTime);

      for (var i = 0; i < this.flights.flights.length; i++) {
        var dateTime: FlightDateTime = new FlightDateTime();
        var tempDepDate = new Date(this.flights.flights[i].departureTime);
        var tempArrDate = new Date(this.flights.flights[i].arrivalTime);
        dateTime.departureDate = dateTime.getDayName(tempDepDate.getDay()) + ',' + dateTime.getMonthName(tempDepDate.getMonth()) + " " + tempDepDate.getDate() + "," + tempDepDate.getFullYear();
        let min = tempDepDate.getMinutes().toString();
        let hour = tempDepDate.getHours().toString();
        if (min.length == 1)
          min = min + '0';
        if (hour.length == 1)
          hour = '0' + hour;
        dateTime.departureTime = hour + ":" + min;
        dateTime.arrivalDate = dateTime.getDayName(tempArrDate.getDay()) + ',' + dateTime.getMonthName(tempArrDate.getMonth()) + " " + tempArrDate.getDate() + "," + tempArrDate.getFullYear();
      
        min = tempArrDate.getMinutes().toString();
        if (min.length == 1)
          min = min + '0';
        hour = tempArrDate.getHours().toString();
        if (hour.length == 1)
          hour = '0' + hour;
        dateTime.arrivalTime = hour + ":" + min;
        this.flightTimeDate.push(dateTime);
      }
      localStorage.setItem('flighttimedate', JSON.stringify(this.flightTimeDate));
      this.finalBooking.booking = [];
      var flightdet = new Flight();
      flightdet.route = this.flights.route;
      flightdet.flights = this.flights.flights;
      flightdet.totalcost = this.flights.totalcost;
      flightdet.class = this.flights.class;
      flightdet.adults = [];
      for (var i = 0; i < this.flights.adults; i++) {
        flightdet.adults.push(new Adult("", "", "", null, null));
      }
      flightdet.children = [];
      for (var i = 0; i < this.flights.children; i++) {
        flightdet.children.push(new Child(null, null, null));
      }
      this.finalBooking.booking.push(flightdet);
      localStorage.setItem('flightresult', JSON.stringify(this.finalBooking));
    }
    else {
      this.flightTimeDate = JSON.parse(localStorage.getItem('flighttimedate'));
      this.finalBooking = JSON.parse(localStorage.getItem('flightresult'));
    }

    this.travellersForms = this.formBuilder.group({
      adulttravellers: this.formBuilder.array([
        this.buildAdultTravellerForm()
      ]),
      childtravellers: this.formBuilder.array([
        this.buildChildrenTravellerForm()
      ])
    });
    this.createForm();
  }
  buildAdultTravellerForm() {
    return this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      age: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }
  buildChildrenTravellerForm() {
    if (this.finalBooking.booking[0].children.length != 0) {
      return this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        age: [null, Validators.required]
      });
    }
    return null;

  }

  createForm() {
    const control1 = <FormArray>this.travellersForms.controls['adulttravellers'];
    for (var i = 0; i < this.finalBooking.booking[0].adults.length - 1; i++) {
      const temptravinfo = this.buildAdultTravellerForm();
      console.log('in');
      control1.push(temptravinfo);
    }
    const control2 = <FormArray>this.travellersForms.controls['childtravellers'];
    for (var i = 0; i < this.finalBooking.booking[0].children.length - 1; i++) {
      console.log('in');
      const temptravinfo = this.buildChildrenTravellerForm();
      control2.push(temptravinfo);
    }
  }
  public isValidField(i: number, field: any, arr: string) {
    var f = this.travellersForms
      .get(arr)
      .get(i.toString())
      .get(field);
    return (f.touched && f.invalid) || (f.invalid && this.submitted);
  }
  onSubmit(template: TemplateRef<any>) {
    this.submitted = true;
  }
  openModal() {
    if (!this.travellersForms.invalid)
      return "modal";
  }


  confirmBooking() {
    this.searchService.postBookingDetails(this.finalBooking).subscribe(response => {
      console.log(response);
      window.alert('Your booking has been confirmed! Your booking ID is ' + response.booking_id)
      this.route.navigate(['home']);
    })

  }
  arrayOne(n: number): any[] {
    return Array(n);
  }

}
