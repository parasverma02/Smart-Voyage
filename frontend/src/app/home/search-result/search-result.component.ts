import { Component, OnInit, TemplateRef } from '@angular/core';
import { SearchResult } from './search-result';
import { FinalBooking } from './final-booking'
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../data.service';
import { Adult } from './adult';
import { Child } from './child';
import { FlightDateTime } from './flight-datetime';
import { SearchResultService } from './search-result.service';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  flights: SearchResult = new SearchResult();
  finalBooking: FinalBooking;
  flightTimeDate: FlightDateTime[];
  // modalRef: BsModalRef;
  travellersForms: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private data: Data, private route: Router,private searchService: SearchResultService) {
  }

  ngOnInit() {     

    this.finalBooking = new FinalBooking();
    this.finalBooking.username = "pam02";
    this.flightTimeDate = [];
    if(this.data.storage != null) {
      this.flights = this.data.storage;
      var d: Date = new Date(this.flights.flights[0].departureTime);

      for (var i = 0; i < this.flights.flights.length; i++) {
        var dateTime: FlightDateTime = new FlightDateTime();
        var tempDepDate = new Date(this.flights.flights[i].departureTime);
        var tempArrDate = new Date(this.flights.flights[i].arrivalTime);
        dateTime.departureDate = dateTime.getDayName(tempDepDate.getDay()) + ',' + dateTime.getMonthName(tempDepDate.getMonth()) + " " + tempDepDate.getDate() + "," + tempDepDate.getFullYear();
        dateTime.departureTime = tempDepDate.getHours() + ":" + tempDepDate.toTimeString();
        dateTime.arrivalDate = dateTime.getDayName(tempArrDate.getDay()) + ',' + dateTime.getMonthName(tempArrDate.getMonth()) + " " + tempArrDate.getDate() + "," + tempArrDate.getFullYear();
        dateTime.arrivalTime = tempArrDate.getHours() + ":" + tempArrDate.getMinutes();
        this.flightTimeDate.push(dateTime);
      }
      localStorage.setItem('flighttimedate',JSON.stringify(this.flightTimeDate));

      this.finalBooking.route = this.flights.route;
      this.finalBooking.flights = this.flights.flights;
      this.finalBooking.totalcost = this.flights.totalcost;
      this.finalBooking.class = this.flights.class;
      this.finalBooking.adults = [];
      for (var i = 0; i < this.flights.adults; i++) {
        this.finalBooking.adults.push(new Adult("", "", "", null, null));
      }
      this.finalBooking.children = [];
      for (var i = 0; i < this.flights.children; i++) {
        this.finalBooking.children.push(new Child(null, null, null));
      }
      localStorage.setItem('flightresult', JSON.stringify(this.finalBooking));
      console.log(JSON.parse(localStorage.getItem('flightresult')));
    }
    else {
      console.log("in else  ");
      this.flightTimeDate = JSON.parse(localStorage.getItem('flighttimedate'));
      this.finalBooking = JSON.parse(localStorage.getItem('flightresult'));
      console.log(this.finalBooking);
    }

    this.travellersForms = this.formBuilder.group({
      adulttravellers : this.formBuilder.array([
        this.buildAdultTravellerForm()
      ]),
      childtravellers : this.formBuilder.array([
        this.buildChildrenTravellerForm()
      ])
    });
    this.createForm();
  }
  buildAdultTravellerForm(){
    return this.formBuilder.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      email : ['', Validators.required],
      age : [null, Validators.required],
      phone : [null, Validators.required]
    });
  }
  buildChildrenTravellerForm(){
    return this.formBuilder.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      age : [null, Validators.required]
    });
  }

  createForm(){
    const control1 = <FormArray>this.travellersForms.controls['adulttravellers'];
    for(var i = 0;i < this.finalBooking.adults.length - 1; i++){
      const temptravinfo = this.buildAdultTravellerForm();
      control1.push(temptravinfo);
    }
    const control2 = <FormArray>this.travellersForms.controls['childtravellers'];
    for(var i = 0;i < this.finalBooking.children.length - 1; i++){
      const temptravinfo = this.buildChildrenTravellerForm();
      control2.push(temptravinfo);
    }
  }
  public isValidField(i: number, field: any,arr: string) {
    var f = this.travellersForms
            .get(arr) //retrieve items FormArray
            .get(i.toString()) //retrieve items FormGroup
            .get(field); //retrieve items form field
          // console.log(f.touched+".."+this.submitted+".."+this.citiesForms);
    return (f.touched && f.invalid) || (f.invalid && this.submitted);
}
  onSubmit(template: TemplateRef<any>){
    this.submitted = true;
  }
  openModal(){
    if(!this.travellersForms.invalid)
      return "modal";
  }
  

  confirmBooking(){
    console.log(this.finalBooking);
     this.searchService.postBookingDetails(this.finalBooking).subscribe(response => {
      console.log(response);
      this.route.navigate(['home']);
    })
    
  }

// ngOnChanges(){
//   console.log("onchange");
//   console.log(JSON.parse(localStorage.getItem('flightresult')));
//   this.finalBooking = JSON.parse(localStorage.getItem('flightresult'));
// }
  arrayOne(n: number): any[] {
    return Array(n);
  }

}
