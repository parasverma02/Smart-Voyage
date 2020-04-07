// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { Component, Injectable } from '@angular/core';
// import { TravellerdetailsComponent } from './travellerdetails.component';
// import { FormsModule } from '@angular/forms'
// import { HttpClientModule } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing';

// describe('TravellerdetailsComponent', () => {
//   let component: TravellerdetailsComponent;
//   let fixture: ComponentFixture<TravellerdetailsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ TravellerdetailsComponent ],
//       imports: [FormsModule,HttpClientModule,RouterTestingModule.withRoutes([
//         { path: 'profilepage;state=travellerdetails', component: DummyComponent}
//     ]) ],

//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TravellerdetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should execute functions',() =>{
//     // spyOn(component, 'onSignup');
//     // const mockUser={firstname:"Aditi",lastname:"P",username:"aditi3049",password:"123456",emailid:"aditi3049@email.com",phonenumber:"9967650280"}
//     //     "id":1,
// //     "firstname":"FirstName",
// //     "lastname":"LastName",
// //     "dob":"1994-11-30",
// //     "gender":"Female",
// //     "emailid":"aditi@email.com",
// //     "phoneno":"9967650280"
//     // component.travellerdetails.firstname="firstname"
//     // component.travellerdetails.lastname="lastname"
//     // component.travellerdetails.dob="dob"
//     // component.travellerdetails.gender="gender"
//     // component.travellerdetails.emailid="emailid"

//     component.onDataChanged([{"firstname":"User"}]);
//     // component.travellerdetails.length=5;
//     component.deleteRow("jane");
//     fixture.detectChanges();

//     //expect(component.onSignup).toHaveBeenCalled();


//   });



  
// });

// @Component({template: ''})
// class DummyComponent {}
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerdetailsComponent } from './travellerdetails.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TravellerdetailsComponent', () => {
  let component: TravellerdetailsComponent;
  let fixture: ComponentFixture<TravellerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerdetailsComponent ,DummyComponent],
      imports: [
        FormsModule,HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'profilepage/travellerdetails/edittravellerdetails', component: DummyComponent},

          { path: 'profilepage;state=travellerdetails', component: DummyComponent},

        ]) ],

        })

    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute functions',() =>{
    // spyOn(component, 'onSignup');
    // const mockUser={firstname:"Aditi",lastname:"P",username:"aditi3049",password:"123456",emailid:"aditi3049@email.com",phonenumber:"9967650280"}
    //     "id":1,
//     "firstname":"FirstName",
//     "lastname":"LastName",
//     "dob":"1994-11-30",
//     "gender":"Female",
//     "emailid":"aditi@email.com",
//     "phoneno":"9967650280"
    // component.travellerdetails.firstname="firstname"
    // component.travellerdetails.lastname="lastname"
    // component.travellerdetails.dob="dob"
    // component.travellerdetails.gender="gender"
    // component.travellerdetails.emailid="emailid"
    const travellerdetailsspec=[{"firstname":"Aditi","lastname":"P","username":"aditi3049","password":"123456","emailid":"aditi3049@email.com","phonenumber":"9967650280"}]
    //     "id":1,
    component.travellerdetails=travellerdetailsspec;
    component.onDataChanged([{"firstname":"aditi3049"}]);
    // component.travellerdetails.length=5;
    component.deleteRow("aditi3049");


    fixture.detectChanges();

    //expect(component.onSignup).toHaveBeenCalled();


  });




  
});
@Component({template: ''})
class DummyComponent {}
