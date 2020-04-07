import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { UserService } from 'src/app/user/shared/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Injectable, Component } from '@angular/core';
import { FlightSearchService } from '../flight-search/flight-search.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, DummyComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule .withRoutes([
          {path: 'login', component: DummyComponent}
       ])
      ],
      providers:[{provide:UserService, useClass: MockUserService}],

    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(UserService);
  });

  it('#onLogout test',() => {
    spyOn(component,'onLogout').and.callThrough();
    spyOn(service,'Logout').and.callThrough();
    component.onLogout();
    expect(service.Logout).toHaveBeenCalledTimes(1);
    expect(component.onLogout).toHaveBeenCalledTimes(1);
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Injectable()
export class MockUserService {
  Logout(){};
  setLoggedIn(value: boolean){};
}
@Component({template: ''})
class DummyComponent {}
