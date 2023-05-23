import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSellingComponent } from './all-selling.component';

describe('AllSellingComponent', () => {
  let component: AllSellingComponent;
  let fixture: ComponentFixture<AllSellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
