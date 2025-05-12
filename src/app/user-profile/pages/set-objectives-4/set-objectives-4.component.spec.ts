import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetObjectives4Component } from './set-objectives-4.component';

describe('SetObjectives4Component', () => {
  let component: SetObjectives4Component;
  let fixture: ComponentFixture<SetObjectives4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetObjectives4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetObjectives4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
