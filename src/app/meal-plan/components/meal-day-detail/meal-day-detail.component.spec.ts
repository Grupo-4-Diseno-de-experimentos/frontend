import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDayDetailComponent } from './meal-day-detail.component';

describe('MealDayDetailComponent', () => {
  let component: MealDayDetailComponent;
  let fixture: ComponentFixture<MealDayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealDayDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealDayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
