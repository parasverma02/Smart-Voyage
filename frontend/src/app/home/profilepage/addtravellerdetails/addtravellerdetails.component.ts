import { Component, OnInit } from '@angular/core';
import { Userdetails } from './../userdetails';
import { ProfilepageService } from '../profilepage.service';

@Component({
  selector: 'app-addtravellerdetails',
  templateUrl: './addtravellerdetails.component.html',
  styleUrls: ['./addtravellerdetails.component.css']
})
export class AddtravellerdetailsComponent implements OnInit {

  constructor(private addtravllerdet:ProfilepageService) { }
  newtraveller = new Userdetails();
  
  ngOnInit() {

  }

  onSave(){
    console.log(this.newtraveller);
    this.addtravllerdet.addnewtravller(this.newtraveller)
    .subscribe(response => {
        console.log(response);
        if(response["message"]=="Success"){
          alert("New traveller added ! Go to 'Traveller List' to view the added traveller");
          this.newtraveller={
            firstname:null,
            lastname:null,username:null, emailid:null,password:null,phonenumber:null, dob:null, gender:null, phone:null
          };
        }
    });
  }

}
