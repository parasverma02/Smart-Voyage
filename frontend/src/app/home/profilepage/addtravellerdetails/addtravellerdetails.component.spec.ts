import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtravellerdetailsComponent } from './addtravellerdetails.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
describe('AddtravellerdetailsComponent', () => {
  let component: AddtravellerdetailsComponent;
  let fixture: ComponentFixture<AddtravellerdetailsComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should execute onSave()',() =>{
    // spyOn(component, 'onSignup');
    // const mockUser={firstname:"Aditi",lastname:"P",username:"aditi3049",password:"123456",emailid:"aditi3049@email.com",phonenumber:"9967650280"}
    component.onSave();
    fixture.detectChanges();

    //expect(component.onSignup).toHaveBeenCalled();


  });


});
