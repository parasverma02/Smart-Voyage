import { TestBed, getTestBed, async } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserAccount } from '../response-objects/user-account';
import { UserLogin } from '../response-objects/user-login';
import { Component } from '@angular/core';

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let service: UserService;
  beforeEach(() => {
    var store = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([
          {path: 'login', component: DummyComponent}
        ])],
      providers: [
        HttpTestingController,
        UserService
      ],
      declarations: [DummyComponent]
    })
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(UserService);
  });

  it('#setLoggedIn() should be called once', () => {
    spyOn(service, 'setLoggedIn').and.callThrough();
    console.log(service);
    service.setLoggedIn(true);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(service.setLoggedIn).toHaveBeenCalledTimes(1);

  })

  it('#isLoggedIn() should be called once', () => {
    spyOn(service, 'isLoggedIn').and.callThrough();
    service.isLoggedIn();
    expect(service.isLoggedIn).toHaveBeenCalledTimes(1);

  })
  it('#Logout() should be called once', () => {
    spyOn(service, 'Logout').and.callThrough();
    service.Logout();
    expect(service.Logout).toHaveBeenCalledTimes(1);
  })
  it('#send_signupRequest() should be called once', () => {
    spyOn(service, 'send_signupRequest').and.callThrough();
    var user: UserAccount = {
      firstname: "string",
      lastname: ",",
      username: "string",
      emailid: "string",
      password: "string",
      phonenumber: "string"
    }
    service.send_signupRequest(user)
    expect(service.send_signupRequest).toHaveBeenCalledTimes(1);
  })
  
  it('#send_loginRequest should be called once', () => {
    spyOn(service, 'send_loginRequest').and.callThrough();
    var user: UserLogin = {
      username: "abc",
      password: 'def'
    }
    service.send_loginRequest(user);
    expect(service.send_loginRequest).toHaveBeenCalledTimes(1);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



});
@Component({template: ''})
class DummyComponent {}