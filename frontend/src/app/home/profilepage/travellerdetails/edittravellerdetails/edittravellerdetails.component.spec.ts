import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { Component, Injectable } from '@angular/core';
import { EdittravellerdetailsComponent } from './edittravellerdetails.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfilepageService } from '../../profilepage.service';
import { CommonModule } from '@angular/common';

describe('EdittravellerdetailsComponent', () => {
  let component: EdittravellerdetailsComponent;
  let fixture: ComponentFixture<EdittravellerdetailsComponent>;
  let service: ProfilepageService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittravellerdetailsComponent ,DummyComponent],
      imports: [FormsModule,HttpClientModule,RouterTestingModule.withRoutes([
        { path: 'profilepage/travellerdetails/edittravellerdetails', component: DummyComponent},
        { path: 'profilepage;state=travellerdetails', component: DummyComponent}
    ]) ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittravellerdetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProfilepageService);

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should execute onSave',() =>{
    component.edittrav=null;
    // spyOn(component, 'onSignup');
    // const mockUser={firstname:"Aditi",lastname:"P",username:"aditi3049",password:"123456",emailid:"aditi3049@email.com",phonenumber:"9967650280"}
    // component.onSave();
    fixture.detectChanges();



  });
  it('#onSave() called once',() => {
    const response = {
      message:"Success"
      // firstname:"",
      // lastname:"",
      // username:"",
      // emailid:"",
      // password:"",phonenumber:"",dob:"",phone:"",gender:""
    };
    spyOn(component,'onSave').and.callThrough();
    spyOn(service,'edittravller').and.returnValue(of(response));
    component.onSave();
    fixture.detectChanges();
    expect(component.onSave).toHaveBeenCalledTimes(1);

  })
});
@Component({template: ''})
class DummyComponent {}
