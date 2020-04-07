import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchComponent } from './flight-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { SearchResult } from '../search-result/search-result';
import { SearchResultService } from '../search-result/search-result.service';
import { FlightSearchService } from './flight-search.service';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSearchComponent, DummyComponent ],
      imports: [
      ReactiveFormsModule,
      HttpClientTestingModule,
      RouterTestingModule .withRoutes([
        {path: 'home' , component: DummyComponent},
        {path: 'login', component: DummyComponent}
     ])
    ],
      providers:[
        SearchResultService,
        FlightSearchService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    it('should execute functions',() =>{
    // spyOn(component, 'onSignup');
    // const mockUser={firstname:"Aditi",lastname:"P",username:"aditi3049",password:"123456",emailid:"aditi3049@email.com",phonenumber:"9967650280"}
    component.onSubmit();
    component.onAdd();
    component.removeCity(1);
    component.onIncrementAdult();
    component.onDecrementAdult();
    component.onIncrementChildren();
    component.onDecrementChildren();
    fixture.detectChanges();

    //expect(component.onSignup).toHaveBeenCalled();


  });
});

@Component({template: ''})
class DummyComponent {}