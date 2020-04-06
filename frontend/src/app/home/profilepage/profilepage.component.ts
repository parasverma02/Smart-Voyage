import { Component, OnInit } from '@angular/core';
// import { UserService } from '../shared/user.service';
import { Userdetails } from './userdetails';
import { ProfilepageService } from './profilepage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  username:any;
  showaddtraveller:boolean=false;
  showtravlist:boolean=false;
  showbooking:boolean=false;
  showedittrav:boolean=false;
  activepage:any;
  edittravstat:any;

  currentbookings:any;
  pastbookings:any;
  // currentbookings=[
  //   {
  //     "bookingid":"78945",
  //     "bookingdate":"03/19/2020",
  //     "routes":["Montreal", "Toronto","Vancouver"],
  //     "adults":3,
  //     "children":0,
  //     "path":[
  //       {
  //         source : "Montreal",
  //         destination: "Toronto",
  //         departureAirportFsCode:"YUL",
  //         arrivalAirportFsCode: "YYZ",
  //         totalFlightTime: "14h 30m",
  //         departureTime: new Date("2020-04-04T03:00:00.000"),
  //         arrivalTime: new Date("2020-04-04T03:00:00.000"),
  //         flightcost: 700,
  //         carrierFsCode: "ACA",
  //         flightNumber: 100,
  //         flightname:"Air Canada",
  //         stops: 0
          
  //       },
  //       {
  //         source : "Toronto",
  //         destination: "Vancouver",
  //         departureAirportFsCode:"YYZ",
  //         arrivalAirportFsCode: "YVR",
  //         totalFlightTime: "14h 30m",
  //         departureTime: new Date("2020-04-04T03:00:00.000"),
  //         arrivalTime: new Date("2020-04-04T03:00:00.000"),
  //         flightcost: 800,
  //         carrierFsCode: "ACA",
  //         flightNumber: 121,
  //         flightname:"Air Canada",
  //         stops: 0
          
  //       },
  //     ],
  //     "flightstatus":"Scheduled",
  //     "totalcost":"CA $1500"

  //   },

  //   {
  //     "bookingid":"14785",
  //     "bookingdate":"01/20/2020",
  //     "routes":["British Columbia", "Toronto","Vancouver"],
  //     "adults":2,
  //     "children":1,
  //     "path":[
  //       {
  //         source : "Montreal",
  //         destination: "Toronto",
  //         departureAirportFsCode:"YUL",
  //         arrivalAirportFsCode: "YYZ",
  //         totalFlightTime: "14h 30m",
  //         departureTime: new Date("2020-04-04T03:00:00.000"),
  //         arrivalTime: new Date("2020-04-04T03:00:00.000"),
  //         flightcost: 700,
  //         carrierFsCode: "ACA",
  //         flightNumber: 100,
  //         stops: 0
          
  //       },
  //       {
  //         source : "Toronto",
  //         destination: "Vancouver",
  //         departureAirportFsCode:"YYZ",
  //         arrivalAirportFsCode: "YVR",
  //         totalFlightTime: "14h 30m",
  //         departureTime: new Date("2020-04-04T03:00:00.000"),
  //         arrivalTime: new Date("2020-04-04T03:00:00.000"),
  //         flightcost: 800,
  //         carrierFsCode: "ACA",
  //         flightNumber: 121,
  //         stops: 0
          
  //       },
  //     ],
  //     "flightstatus":"Scheduled",
  //     "totalcost":"CA $1500"

  //   },
  // ]

  // pastbookings=[
  //   {
  //     "bookingid":"78945",
  //     "bookingdate":"05/19/2019",
  //     "routes":["Montreal", "Toronto","Vancouver"],
  //     "adults":5,
  //     "children":2,
  //     "path":[
  //       {
  //         source : "Montreal",
  //         destination: "Toronto",
  //         departureAirportFsCode:"YUL",
  //         arrivalAirportFsCode: "YYZ",
  //         totalFlightTime: "14h 30m",
  //         departureTime: new Date("2019-07-04T03:00:00.000"),
  //         arrivalTime: new Date("2019-07-04T03:00:00.000"),
  //         flightcost: 700,
  //         carrierFsCode: "ACA",
  //         flightNumber: 100,
  //         flightname:"Air Canada",
  //         stops: 0
          
  //       },
  //       {
  //         source : "Toronto",
  //         destination: "Vancouver",
  //         departureAirportFsCode:"YYZ",
  //         arrivalAirportFsCode: "YVR",
  //         totalFlightTime: "14h 30m",
  //         departureTime: new Date("2019-07-04T03:00:00.000"),
  //         arrivalTime: new Date("2019-07-04T03:00:00.000"),
  //         flightcost: 800,
  //         carrierFsCode: "ACA",
  //         flightNumber: 121,
  //         flightname:"Air Canada",
  //         stops: 0
          
  //       },
  //     ],
  //     "flightstatus":"Past flight",
  //     "totalcost":"CA $1500"

  //   },

  //   {
  //     "bookingid":"14785",
  //     "bookingdate":"01/20/2019",
  //     "routes":["British Columbia", "Toronto","Vancouver"],
  //     "adults":10,
  //     "children":3,
  //     "path":[
  //       {
  //         source : "Montreal",
  //         destination: "Toronto",
  //         departureAirportFsCode:"YUL",
  //         arrivalAirportFsCode: "YYZ",
  //         totalFlightTime: "14h 30m",
  //         departureTime: new Date("2019-05-04T03:00:00.000"),
  //         arrivalTime: new Date("2019-05-04T03:00:00.000"),
  //         flightcost: 700,
  //         carrierFsCode: "ACA",
  //         flightNumber: 100,
  //         stops: 0
          
  //       },
  //       {
  //         source : "Toronto",
  //         destination: "Vancouver",
  //         departureAirportFsCode:"YYZ",
  //         arrivalAirportFsCode: "YVR",
  //         totalFlightTime: "14h 30m",
  //         departureTime: new Date("2019-05-04T03:00:00.000"),
  //         arrivalTime: new Date("2019-05-04T03:00:00.000"),
  //         flightcost: 1000,
  //         carrierFsCode: "ACA",
  //         flightNumber: 121,
  //         stops: 0
          
  //       },
  //     ],
  //     "flightstatus":"Past Flight",
  //     "totalcost":"CA $1700"

  //   },
  // ]

  constructor(private gettraveldetails:ProfilepageService,private router: Router) { 
    this.activepage=this.router.getCurrentNavigation().extras.state;
    console.log(this.activepage);
   
 
  }
  // currentbookings:any;
  // pastbooking:any;
  user = new Userdetails();
  
  tableresp:any;
  // ngDoCheck(){
  //   this.edittravstat=localStorage.getItem("showedittrav");
  //   if(this.edittravstat=="true"){
  //     // alert(this.edittravstat);
  //     this.showedittrav=!this.showedittrav;
  //   }
  //   // alert(this.edittravstat);
  // }


  ngOnInit() {
    // alert(JSON.stringify(this.activepage));

    if(this.activepage=="addtravellerdetails"){
      this.toggleaddtraveller();
    }
    else if(this.activepage=="travellerdetails"){
      this.toggletralist();
    }
    else if(this.activepage=="currentbookings"){
      this.togglebookings();
    }
    else{
      this.togglebookings();
    }
    
    this.username=localStorage.getItem("loggedInUsername")

    this.gettraveldetails.getuserdetails().subscribe(resp=>{

    });
    this.gettraveldetails.getcurrflights().subscribe(resp=>{
      this.currentbookings=resp;
    });
    this.gettraveldetails.getpastflights().subscribe(resp=>{
      this.pastbookings=resp;
    });
  }
//   onDataChanged(event: any[]): void {
//     alert(event);
//     console.log(event);
    
//   }
//   CountRows() {
//     var totalRowCount = 0;
//     var rowCount = 0;
//     var table = document.getElementById("table");
//     var rows = table.getElementsByTagName("th")
    
// }

//   submit(formValues) {
  
//     var table = document.getElementById("table");
//     var rows = table.getElementsByTagName("th")
//     alert(rows.length)

//     this.tableresp=JSON.stringify(formValues);
//     for (var key in formValues) {
//       if (formValues.hasOwnProperty(key)) {
//           console.log(key + " -> " + formValues[key]);
//       }
//   }
//     console.log(formValues)
//   }
toggleedittrav(){
  this.showaddtraveller = ! this.showaddtraveller;
  this.showtravlist=false;
  this.showbooking = false;
}
toggleaddtraveller(){
  this.showaddtraveller = ! this.showaddtraveller;
  this.showtravlist=false;
  this.showbooking = false;
}
toggletralist(){
  this.showtravlist = ! this.showtravlist;
  this.showaddtraveller = false;
  this.showbooking = false;

}
togglebookings(){
  this.showbooking = ! this.showbooking;
  this.showaddtraveller = false;
  this.showtravlist=false;

}


}
