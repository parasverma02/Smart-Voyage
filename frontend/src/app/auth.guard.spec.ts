import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from './user/shared/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchResultService } from './home/search-result/search-result.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';

describe('AuthGuard', () => {
  let userService: UserService;
  let searchService: SearchResultService;
  let authGuard: AuthGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[DummyComponent2],
      imports:[
        RouterTestingModule.withRoutes([
          {path: 'login', component: DummyComponent2}
        ]),
        HttpClientTestingModule
      ],
      providers: [
        AuthGuard,
        UserService,
        SearchResultService
      ]
    });
    userService = TestBed.get(UserService);
    searchService = TestBed.get(SearchResultService);
    authGuard = TestBed.get(AuthGuard);
  });

  it('#canActivate() is called once and returns true',()=>{
    spyOn(authGuard,'canActivate').and.callThrough();
    spyOn(userService,'isLoggedIn').and.returnValue(true);
    var ret = authGuard.canActivate();
    expect(ret).toBe(true);
    expect(authGuard.canActivate).toHaveBeenCalledTimes(1);
  })
  it('#canActivate() is called and returns false',()=>{
    spyOn(authGuard,'canActivate').and.callThrough();
    spyOn(userService,'isLoggedIn').and.returnValue(false);
    var ret = authGuard.canActivate();
    expect(ret).toBe(false);
    expect(authGuard.canActivate).toHaveBeenCalledTimes(1);
  })
  it('#canActivateChild() is called and returns true',()=>{
    spyOn(authGuard,'canActivateChild').and.callThrough();
    spyOn(searchService,'isResultAccessible').and.returnValue(true);
    var ret = authGuard.canActivateChild();
    expect(ret).toBe(true);
    expect(authGuard.canActivateChild).toHaveBeenCalledTimes(1);
  })
  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

@Component({template: ''})
class DummyComponent2 {}