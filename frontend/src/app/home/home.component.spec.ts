import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header/header.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Data } from './data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, HeaderComponent, FlightSearchComponent ],
      imports:[
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSelectModule,
        HttpClientTestingModule
      ],
      providers:[Data]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
