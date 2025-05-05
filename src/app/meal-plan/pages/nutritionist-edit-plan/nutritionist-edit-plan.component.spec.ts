import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistEditPlanComponent } from './nutritionist-edit-plan.component';

describe('NutritionistEditPlanComponent', () => {
  let component: NutritionistEditPlanComponent;
  let fixture: ComponentFixture<NutritionistEditPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionistEditPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionistEditPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
