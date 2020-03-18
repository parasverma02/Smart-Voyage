import { Component, OnInit } from '@angular/core';
// import { UserService } from '../shared/user.service';
import { Userdetails } from './userdetails';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  constructor() { }
  user = new Userdetails();
  tableresp:any;
  ngOnInit() {
  }
  onDataChanged(event: any[]): void {
    alert(event);
    console.log(event);
    
  }
  CountRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("table");
    var rows = table.getElementsByTagName("th")
    
}

  submit(formValues) {
  
    var table = document.getElementById("table");
    var rows = table.getElementsByTagName("th")
    alert(rows.length)

    this.tableresp=JSON.stringify(formValues);
    for (var key in formValues) {
      if (formValues.hasOwnProperty(key)) {
          console.log(key + " -> " + formValues[key]);
      }
  }
    console.log(formValues)
  }

}
