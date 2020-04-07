import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtravellerdetailsComponent } from './addtravellerdetails.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ProfilepageService } from '../profilepage.service';
import { of } from 'rxjs';

describe('AddtravellerdetailsComponent', () => {
  let component: AddtravellerdetailsComponent;
  let fixture: ComponentFixture<AddtravellerdetailsComponent>;
  let service: ProfilepageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtravellerdetailsComponent ],
      imports: [FormsModule,HttpClientModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtravellerdetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProfilepageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should execute onSave()',() =>{
    // spyOn(component, 'onSignup');
    // const mockUser={firstname:"Aditi",lastname:"P",username:"aditi3049",password:"123456",emailid:"aditi3049@email.com",phonenumber:"9967650280"}
    // component.onSave();
    fixture.detectChanges();

    //expect(component.onSignup).toHaveBeenCalled();


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
    spyOn(service,'addnewtravller').and.returnValue(of(response));
    component.onSave();
    fixture.detectChanges();
    expect(component.onSave).toHaveBeenCalledTimes(1);

  })


});
