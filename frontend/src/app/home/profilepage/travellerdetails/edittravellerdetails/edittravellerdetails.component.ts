import { Component, OnInit } from '@angular/core';
import { ProfilepageService } from '../../profilepage.service';

@Component({
  selector: 'app-edittravellerdetails',
  templateUrl: './edittravellerdetails.component.html',
  styleUrls: ['./edittravellerdetails.component.css']
})
export class EdittravellerdetailsComponent implements OnInit {

  constructor(private edittravllerdet:ProfilepageService) { }
  edittrav:any;

  ngOnInit() {
    this.edittrav = JSON.parse(localStorage.getItem('edittravllerdet'));
    // alert(this.edittrav)
    console.log(this.edittrav)
  }

  onSave(){
    console.log(this.edittrav);
    this.edittravllerdet.edittravller(this.edittrav).subscribe(response => {

    });
  }
  

}
