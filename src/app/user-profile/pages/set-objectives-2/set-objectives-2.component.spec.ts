import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetObjectives2Component } from './set-objectives-2.component';

describe('SetObjectives2Component', () => {
  let component: SetObjectives2Component;
  let fixture: ComponentFixture<SetObjectives2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetObjectives2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetObjectives2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
