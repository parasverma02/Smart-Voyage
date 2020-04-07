import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignInComponent } from './sign-in.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { of, Observable } from 'rxjs';
import { Component, Injectable } from '@angular/core';
import { Location } from '@angular/common';
describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let _userService: UserService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent, DummyComponent ],
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule .withRoutes([
          {path: 'home' , component: DummyComponent},
          {path: 'login', component: DummyComponent}
       ])
      ],
      providers:[
        UserService,
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('send login request',() => {

    beforeEach(() => {
      _userService = TestBed.get(UserService);
    });
    function updateForm(username, password) {
      component.signinForm.controls.username.setValue(username);
      component.signinForm.controls.password.setValue(password);
    }
    it('Invalid form', () => {
     spyOn(component,'onSignin').and.callThrough();
     updateForm('abc','def');
     component.onSignin();
      expect(component.signinForm.valid).toBeFalsy();
    });

    it('#onSignIn with true success respone', () => {
      const response = {
        success: true
      };
      spyOn(component,'onSignin').and.callThrough();
      spyOn(_userService,'send_loginRequest').and.returnValue(of(response));
      updateForm('abc','defghi');
      component.onSignin();

      expect(component.onSignin).toHaveBeenCalledTimes(1);
    })
    it('#onSignIn with false success response', () => {
      const response = {
        success: false
      };
      spyOn(component,'onSignin').and.callThrough();
      spyOn(_userService,'send_loginRequest').and.returnValue(of(response));
      updateForm('abc','defghi');
      component.onSignin();
      expect(component.onSignin).toHaveBeenCalledTimes(1);
    })
    it('#get f() ', () => {
      let spy = spyOnProperty(component,'f','get').and.callThrough();
      component.f;
      expect(spy).toHaveBeenCalled();
    });

    it('#ngOnInit() if user is already loggedin',fakeAsync(()=>{
      spyOn(component,'ngOnInit').and.callThrough();
      spyOn(_userService,'isLoggedIn').and.returnValue(true);
      component.ngOnInit();
      var location = TestBed.get(Location);
      expect(component.ngOnInit).toHaveBeenCalledTimes(1);
      tick()
      expect(location.path()).toEqual('/home');
    }))
    it('#ngOnInit() if new user',fakeAsync(()=>{
      spyOn(component,'ngOnInit').and.callThrough();
      spyOn(_userService,'isLoggedIn').and.returnValue(false);
      component.ngOnInit();
      expect(component.ngOnInit).toHaveBeenCalledTimes(1);
    }))
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({template: ''})
class DummyComponent {}

