import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { SearchResultService } from './search-result.service';
import { Data } from '../data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let service: SearchResultService;
  let dataService: Data;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ SearchResultComponent,HeaderComponent, DummyComponent ],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule,   
        RouterTestingModule .withRoutes([
          {path: 'home' , component: DummyComponent}
       ])
      ],
      providers:[
        SearchResultService,
        {provide:Data, useClass: mockData }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(SearchResultService);
    dataService = TestBed.get(Data);
  });
  

  it('#onSubmit() called once',() => {
    spyOn(component,'onSubmit').and.callThrough();
    component.onSubmit(null);
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  })

  it('#confirmBooking() called once',() => {
    const response = {
      success: true
    };
    spyOn(component,'confirmBooking').and.callThrough();
    spyOn(service,'postBookingDetails').and.returnValue(of(response));
    component.confirmBooking();
    expect(component.confirmBooking).toHaveBeenCalledTimes(1);

  })
  it('#arrayOne() called once',() => {
    spyOn(component,'arrayOne').and.callThrough();
    component.arrayOne(1);
    expect(component.arrayOne).toHaveBeenCalledTimes(1);
  })
  it('#opemModal() called with valid form ',()=>{
    spyOn(component,'openModal').and.callThrough();
    spyOnProperty(component.travellersForms,'invalid').and.returnValue(false);
    component.openModal();
    expect(component.openModal).toHaveBeenCalledTimes(1);

  })
  // it('#ngOnInit when storage.data is null',()=>{
    
  //   component.ngOnInit();
  //   expect(component.finalBooking).toHaveBeenCalledTimes(1);
  // })
  it('Traveller form invalid when empty', () => {
    expect(component.travellersForms.valid).toBeFalsy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({template: ''})
class DummyComponent {}

@Injectable()
class mockData {
  public storage: any = {
      adults:1,
      children:1,
      class:'eco',
      flights: [{
        source:'abc',
        destination:'def',
        arrivalAirportFsCode:'ghi',
        arrivalTime: new Date(),
        departureAirportFsCode: 'jkl',
        departureTime: new Date(),  
        carrierFsCode:'mno',
        flightNumber:123,
        flightcost:12,
        stops:0,
        totalFlightTime: '123'
      }],
      route:[],
      totalcost:1,
      username:'ab'
    
  }

  public constructor() { }
}