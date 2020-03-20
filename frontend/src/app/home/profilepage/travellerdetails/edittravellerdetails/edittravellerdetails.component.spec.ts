import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittravellerdetailsComponent } from './edittravellerdetails.component';

describe('EdittravellerdetailsComponent', () => {
  let component: EdittravellerdetailsComponent;
  let fixture: ComponentFixture<EdittravellerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittravellerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittravellerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
