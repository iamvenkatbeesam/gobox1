import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenttypeselectionComponent } from './paymenttypeselection.component';

describe('PaymenttypeselectionComponent', () => {
  let component: PaymenttypeselectionComponent;
  let fixture: ComponentFixture<PaymenttypeselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymenttypeselectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymenttypeselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
