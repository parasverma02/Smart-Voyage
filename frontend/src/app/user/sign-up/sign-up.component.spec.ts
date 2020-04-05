import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignUpComponent } from './sign-up.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { of } from 'rxjs';
import { appRoutes } from 'src/app/app.routing';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { get } from 'http';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let _userService: UserService;
  let router: Router;
  beforeEach(async(() => {
    // routerspy = { navigate : jasmine.createSpy("navigate") }
    TestBed.configureTestingModule({
      declarations: [SignUpComponent, DummyComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: DummyComponent },
          { path: 'login', component: DummyComponent }
        ])
      ],
      providers: [
        UserService,
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('send login request', () => {

    beforeEach(() => {
      _userService = TestBed.get(UserService);
    });
    function updateForm(username, password, firstname, lastname, email, phone) {
      component.signupForm.controls.username.setValue(username);
      component.signupForm.controls.firstname.setValue(firstname);
      component.signupForm.controls.lastname.setValue(lastname);
      component.signupForm.controls.password.setValue(password);
      component.signupForm.controls.email.setValue(email);
      component.signupForm.controls.phone.setValue(phone);

    }
    it('Invalid form', () => {
      spyOn(component, 'onSignup').and.callThrough();
      updateForm('abc', 'def', 'ghi', 'jkl', 'mno', 'pqr');
      component.onSignup();
      expect(component.signupForm.valid).toBeFalsy();
    });

    it('#onSignUp with true success respone', fakeAsync(() => {
      const response = {
        success: true,
        response: 'User Signup successful!'
      };
      spyOn(component, 'onSignup').and.callThrough();
      spyOn(_userService, 'send_signupRequest').and.returnValue(of(response));
      updateForm('abc', 'defghi', 'ghi', 'jkl', 'mno@gmail.com', 'pqr');
      component.onSignup();
      var location = TestBed.get(Location);
      expect(component.onSignup).toHaveBeenCalledTimes(1);
      tick();
      expect(location.path()).toEqual('/home');
    }))

    it('#onSignIn with false success response', () => {
      const response = {
        success: false,
        response: 'Another User with that username already exist!'
      };
      spyOn(component, 'onSignup').and.callThrough();
      spyOn(_userService, 'send_signupRequest').and.returnValue(of(response));
      updateForm('abc', 'defghi', 'ghi', 'jklmno', 'mno@gmail.com', 'pqr');

      component.onSignup();
      expect(component.onSignup).toHaveBeenCalledTimes(1);
    })
    it('#get f() ', () => {
      let spy = spyOnProperty(component,'f','get').and.callThrough();
      component.f;
      expect(spy).toHaveBeenCalled();
    });
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

@Component({ template: '' })
class DummyComponent { }
