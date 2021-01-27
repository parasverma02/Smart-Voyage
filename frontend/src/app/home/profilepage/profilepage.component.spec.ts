import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepageComponent } from './profilepage.component';
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../home/header/header.component';
import { AddtravellerdetailsComponent } from '../../home/profilepage/addtravellerdetails/addtravellerdetails.component';
import { TravellerdetailsComponent } from '../../home/profilepage/travellerdetails/travellerdetails.component';
import { EdittravellerdetailsComponent } from '../../home/profilepage/travellerdetails/edittravellerdetails/edittravellerdetails.component';
describe('ProfilepageComponent', () => {
  let component: ProfilepageComponent;
  let fixture: ComponentFixture<ProfilepageComponent>;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilepageComponent ,HeaderComponent,AddtravellerdetailsComponent,EdittravellerdetailsComponent,TravellerdetailsComponent],
      imports: [FormsModule,HttpClientModule,RouterTestingModule ,RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(ProfilepageComponent);
    // component = fixture.componentInstance;

    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
  // it('should execute functions',() =>{

  //   // spyOn(component, 'onSignup');
  //   // const mockUser={firstname:"Aditi",lastname:"P",username:"aditi3049",password:"123456",emailid:"aditi3049@email.com",phonenumber:"9967650280"}
  //   const activepagespec={"extras":{"state":"addtravellerdetails"}}
  //   component.activepage=activepagespec;
    
  //   component.toggleaddtraveller();
  //   component.activepage=activepagespec;
  //   component.toggletralist();
  //   component.activepage=activepagespec;
  //   component.togglebookings();
  //   component.activepage=activepagespec;
  //   component.ngOnInit();
  //   fixture.detectChanges();


  //   //expect(component.onSignup).toHaveBeenCalled();


  // });
 
 



});
