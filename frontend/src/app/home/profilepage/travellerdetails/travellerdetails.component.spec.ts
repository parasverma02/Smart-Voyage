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
      declarations: [ TravellerdetailsComponent ],
      imports: [FormsModule,HttpClientModule,RouterTestingModule],

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




  
});
