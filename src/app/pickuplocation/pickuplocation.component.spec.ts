import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickuplocationComponent } from './pickuplocation.component';

describe('PickuplocationComponent', () => {
  let component: PickuplocationComponent;
  let fixture: ComponentFixture<PickuplocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickuplocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickuplocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
