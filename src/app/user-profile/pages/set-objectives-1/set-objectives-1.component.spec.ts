import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetObjectives1Component } from './set-objectives-1.component';

describe('SetObjectives1Component', () => {
  let component: SetObjectives1Component;
  let fixture: ComponentFixture<SetObjectives1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetObjectives1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetObjectives1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
