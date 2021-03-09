import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroplocationComponent } from './droplocation.component';

describe('DroplocationComponent', () => {
  let component: DroplocationComponent;
  let fixture: ComponentFixture<DroplocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroplocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroplocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
