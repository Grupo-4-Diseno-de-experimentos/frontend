import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetObjectives3Component } from './set-objectives-3.component';

describe('SetObjectives3Component', () => {
  let component: SetObjectives3Component;
  let fixture: ComponentFixture<SetObjectives3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetObjectives3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetObjectives3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
