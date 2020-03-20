import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerdetailsComponent } from './travellerdetails.component';

describe('TravellerdetailsComponent', () => {
  let component: TravellerdetailsComponent;
  let fixture: ComponentFixture<TravellerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
