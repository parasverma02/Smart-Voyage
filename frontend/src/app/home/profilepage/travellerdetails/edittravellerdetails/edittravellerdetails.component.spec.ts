import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittravellerdetailsComponent } from './edittravellerdetails.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('EdittravellerdetailsComponent', () => {
  let component: EdittravellerdetailsComponent;
  let fixture: ComponentFixture<EdittravellerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittravellerdetailsComponent ],
      imports: [FormsModule,HttpClientModule,RouterTestingModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittravellerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should execute onSave',() =>{
    // spyOn(component, 'onSignup');
    // const mockUser={firstname:"Aditi",lastname:"P",username:"aditi3049",password:"123456",emailid:"aditi3049@email.com",phonenumber:"9967650280"}
    component.onSave();
    fixture.detectChanges();

    //expect(component.onSignup).toHaveBeenCalled();


  });
});
