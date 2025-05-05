import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanWeekComponent } from './meal-plan-week.component';

describe('MealPlanWeekComponent', () => {
  let component: MealPlanWeekComponent;
  let fixture: ComponentFixture<MealPlanWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlanWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealPlanWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
