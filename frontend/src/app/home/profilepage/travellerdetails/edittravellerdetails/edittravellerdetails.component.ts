import { Component, OnInit } from '@angular/core';
import { ProfilepageService } from '../../profilepage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edittravellerdetails',
  templateUrl: './edittravellerdetails.component.html',
  styleUrls: ['./edittravellerdetails.component.css']
})
export class EdittravellerdetailsComponent implements OnInit {

  constructor(private router: Router,private edittravllerdet:ProfilepageService) { }
  edittrav:any;

  ngOnInit() {
    this.edittrav = JSON.parse(localStorage.getItem('edittravllerdet'));
    // alert(this.edittrav)
    if(this.edittrav== null){
      this.edittrav={"firstname":""}
    }
    console.log(this.edittrav)
  }

  onSave(){
    console.log(this.edittrav);
    this.edittravllerdet.edittravller(this.edittrav).subscribe(response => {
console.log(response["message"]);
if(response["message"]=="Success"){
  this.router.navigate(['profilepage',{state:"travellerdetails"}]);

}
    });
  }
  

}
