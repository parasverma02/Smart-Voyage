import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtravellerdetailsComponent } from './addtravellerdetails.component';

describe('AddtravellerdetailsComponent', () => {
  let component: AddtravellerdetailsComponent;
  let fixture: ComponentFixture<AddtravellerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtravellerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtravellerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
