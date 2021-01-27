import { async, ComponentFixture } from '@angular/core/testing';
import { TestBed,getTestBed, tick, fakeAsync } from '@angular/core/testing';
import { ProfilepageService } from './profilepage.service';
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../home/header/header.component';
import { AddtravellerdetailsComponent } from '../../home/profilepage/addtravellerdetails/addtravellerdetails.component';
import { TravellerdetailsComponent } from '../../home/profilepage/travellerdetails/travellerdetails.component';
import { EdittravellerdetailsComponent } from '../../home/profilepage/travellerdetails/edittravellerdetails/edittravellerdetails.component';
import { Userdetails } from './userdetails';

describe('ProfilepageService', () => {
  let component: ProfilepageService;
  let fixture: ComponentFixture<ProfilepageService>;
  let service: ProfilepageService;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ProfilepageService ,HeaderComponent,AddtravellerdetailsComponent,EdittravellerdetailsComponent,TravellerdetailsComponent],
  //     imports: [FormsModule,HttpClientModule,RouterTestingModule ,RouterModule]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule
       ],
  
    
  
    })
    service = TestBed.get(ProfilepageService);

  });

  it('should be created', () => {
    const service: ProfilepageService = TestBed.get(ProfilepageService);
    expect(service).toBeTruthy();
  });
 
  it('#addnewtravller() should be called once', () => {
    // component.username="aditi3049"
    spyOn(service, 'addnewtravller').and.callThrough();
    var searchDetails = new Userdetails();
    searchDetails={"firstname": "Paras", "lastname": "Verma","username":" ","password":"","phonenumber":"  ","dob":" ", "emailid": "v.paras2@gmail.com", "gender": "male", "phone": "2265074804"};
    service.addnewtravller(searchDetails);
    expect(service.addnewtravller).toHaveBeenCalledTimes(1);
  
  })
  it('#edittravller() should be called once', () => {
    // component.username="aditi3049"
    spyOn(service, 'edittravller').and.callThrough();
    var searchDetails = new Userdetails();
    searchDetails={"firstname": "Paras", "lastname": "Verma","username":" ","password":"","phonenumber":"  ","dob":" ", "emailid": "v.paras2@gmail.com", "gender": "male", "phone": "2265074804"};
    service.edittravller(searchDetails);
    expect(service.edittravller).toHaveBeenCalledTimes(1);
  
  })
  it('#removetraveller() should be called once', () => {
    // component.username="aditi3049"
    spyOn(service, 'removetravller').and.callThrough();
    //  searchDetails = new Userdetails();
    //  var searchDetails={"firstname": "Paras"};
    service.removetravller("Paras");
    expect(service.removetravller).toHaveBeenCalledTimes(1);
  
  })
  // it('#gettravellerlist() should be called once', fakeAsync (() => {
  //   spyOn(service, 'gettravellerlist').and.callThrough();
  //   // var searchDetails = new SearchDetails('aa','cc',  new Date(), [{ city: 'b', days: 4}], 1, 2)
  //   var mockdata = [{"firstname": "Paras", "lastname": "Verma", "email": "v.paras2@gmail.com", "age": 25, "phone": 2265074804}];
  //   service.gettravellerlist().subscribe((data) =>{
  //     expect(data).toBe(2);
  //   });
  //   expect(service.gettravellerlist).toHaveBeenCalledTimes(1);
  //   // tick();
  //   // httpMock.expectOne(url + 'cityinfo').flush({mockdata});
  //   // httpMock.verify();
  // }))





});
