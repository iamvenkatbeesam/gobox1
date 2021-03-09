import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerequestComponent } from './makerequest.component';

describe('MakerequestComponent', () => {
  let component: MakerequestComponent;
  let fixture: ComponentFixture<MakerequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakerequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
