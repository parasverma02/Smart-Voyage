import { Component, OnInit } from '@angular/core';
import { Userdetails } from './../userdetails';
import { Router } from '@angular/router';
import { ProfilepageService } from '../profilepage.service';

@Component({
  selector: 'app-travellerdetails',
  templateUrl: './travellerdetails.component.html',
  styleUrls: ['./travellerdetails.component.css']
})
export class TravellerdetailsComponent implements OnInit {

  constructor(private router: Router, private travellerservice:ProfilepageService) { }
  user = new Userdetails();
  tableresp:any;
  travellerdetails:any;
//   travellerdetails=[{
//     "id":1,
//     "firstname":"FirstName",
//     "lastname":"LastName",
//     "dob":"1994-11-30",
//     "gender":"Female",
//     "emailid":"aditi@email.com",
//     "phoneno":"9967650280"
//   },
//   {"id":2,
//     "firstname":"Aditi",
//     "lastname":"P",
//     "dob":"1993-07-22",
//     "gender":"Female",
//     "emailid":"aditi4@email.com",
//     "phoneno":"9967650280"
//   },
//   {
//     "id":3,
//     "firstname":"Jane",
//     "lastname":"Doe",
//     "dob":"1991-07-22",
//     "gender":"Female",
//     "emailid":"jane@email.com",
//     "phoneno":"9967650280"
//   },
// ]

  ngOnInit() {
    this.travellerservice.gettravellerlist().subscribe(response=>{
      this.travellerdetails=response;

    })
  }

  onDataChanged(event: any[]): void {
    // alert(event);
    console.log(event);
    localStorage.setItem('edittravllerdet', JSON.stringify(event));
    localStorage.setItem('showedittrav', "true");

    this.router.navigateByUrl('/profilepage/travellerdetails/edittravellerdetails');    
    // this.router.navigate(['profilepage',{state:"edittraveller"}]);

  }

  deleteRow(userfirstname){
    for(let i = 0; i < this.travellerdetails.length; ++i){
        if (this.travellerdetails[i].firstname === userfirstname) {
            this.travellerdetails.splice(i,1);
            this.travellerservice.removetravller(userfirstname).subscribe(response=>{
              
            })
        }
    }
}

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

}




