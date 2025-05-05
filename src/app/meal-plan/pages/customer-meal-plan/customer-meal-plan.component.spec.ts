import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMealPlanComponent } from './customer-meal-plan.component';

describe('CustomerMealPlanComponent', () => {
  let component: CustomerMealPlanComponent;
  let fixture: ComponentFixture<CustomerMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMealPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
