import { TestBed, getTestBed } from '@angular/core/testing';

import { SearchResultService } from './search-result.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchResult } from './search-result';
import { FinalBooking } from './final-booking';

describe('SearchResultService', () => {
  let httpMock: HttpTestingController;
  let service: SearchResultService;
  beforeEach(() => {
   
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule 
      ],
      providers: [
        HttpTestingController,
        SearchResultService
      ]
  })
  httpMock = getTestBed().get(HttpTestingController);
  service = TestBed.get(SearchResultService);
});

  it('#giveAccessToResult() should be called once',()=>{
    spyOn(service,'giveAccessToResul').and.callThrough();
    service.giveAccessToResul();
    expect(service.giveAccessToResul).toHaveBeenCalledTimes(1);
  })
  it('#isResultAccessible should be called once',()=>{
    spyOn(service,'isResultAccessible').and.callThrough();
    service.isResultAccessible();
    expect(service.isResultAccessible).toHaveBeenCalledTimes(1);
  })
  it('#removeAccessToResult should be called once',()=>{
    spyOn(service,'removeAccessToResult').and.callThrough();
    service.removeAccessToResult();
    expect(service.removeAccessToResult).toHaveBeenCalledTimes(1);
  })
  it('#postBookingDetails should be called once',()=>{
    spyOn(service,'postBookingDetails').and.callThrough();
    var bookingdetails: FinalBooking = {
      booking: [{
        adults:[{
          firstname:'ab',
          lastname:'be',
          age:12,
          email:'abc@email.com',
          phone: 123
        }],
        children:[{
          firstname:'ab',
          lastname:'be',
          age:12
        }],
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
      }],
     
      username:'ab'
    }
    service.postBookingDetails(bookingdetails);
    expect(service.postBookingDetails).toHaveBeenCalledTimes(1);
  })
  
  it('should be created', () => {
    const service: SearchResultService = TestBed.get(SearchResultService);
    expect(service).toBeTruthy();
  });
});
