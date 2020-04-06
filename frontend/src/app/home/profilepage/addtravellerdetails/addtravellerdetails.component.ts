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
    });
  }

}
