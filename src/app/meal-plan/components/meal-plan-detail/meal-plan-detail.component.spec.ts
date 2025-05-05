import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanDetailComponent } from './meal-plan-detail.component';

describe('MealPlanDetailComponent', () => {
  let component: MealPlanDetailComponent;
  let fixture: ComponentFixture<MealPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlanDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
