import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetObjectives5Component } from './set-objectives-5.component';

describe('SetObjectives5Component', () => {
  let component: SetObjectives5Component;
  let fixture: ComponentFixture<SetObjectives5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetObjectives5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetObjectives5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
