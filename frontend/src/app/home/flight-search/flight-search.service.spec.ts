import { TestBed,getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { FlightSearchService } from './flight-search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchDetails } from './search-details';
import { url } from 'src/config';
import { Airports } from './airports';
import { NgxSelectModule } from 'ngx-select-ex';
import { ReactiveFormsModule } from '@angular/forms';


describe('FlightSearchService', () => {
  let httpMock: HttpTestingController;
  let service: FlightSearchService;
  beforeEach(() => {
    
    TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      HttpClientTestingModule,
      NgxSelectModule
     ],

    providers: [
      HttpTestingController,
    ]

  })
  httpMock = getTestBed().get(HttpTestingController);
  service = TestBed.get(FlightSearchService);
});

it('#postFlightSearch() should be called once', () => {
  spyOn(service, 'postFlightSearch').and.callThrough();
  var searchDetails = new SearchDetails('aa','cc',  new Date(), [{ city: 'b', days: 4}], 1, 2)
  service.postFlightSearch(searchDetails);
  expect(service.postFlightSearch).toHaveBeenCalledTimes(1);

})
it('#getAirport() should be called once', fakeAsync (() => {
  spyOn(service, 'getAirports').and.callThrough();
  // var searchDetails = new SearchDetails('aa','cc',  new Date(), [{ city: 'b', days: 4}], 1, 2)
  var mockdata = ['Mumbai','Delhi'];
  service.getAirports().subscribe((data: Airports) =>{
    expect(data.city.length).toBe(2);
  });
  expect(service.getAirports).toHaveBeenCalledTimes(1);
  // tick();
  // httpMock.expectOne(url + 'cityinfo').flush({mockdata});
  // httpMock.verify();
}))

  it('should be created', () => {
    const service: FlightSearchService = TestBed.get(FlightSearchService);
    expect(service).toBeTruthy();
  });
});
