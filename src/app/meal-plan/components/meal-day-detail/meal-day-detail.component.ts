/*
import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardModule, MatCardTitle} from '@angular/material/card';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {DayPlan, MealPlan} from '../../model/meal-plan.model';
import {MealPlanService} from '../../services/meal-plan.service';

@Component({
  selector: 'app-meal-day-detail',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardModule,
    MatCard,
    RouterLink,
    MatButton,
    NgForOf
  ],
  templateUrl: './meal-day-detail.component.html',
  styleUrl: './meal-day-detail.component.css'
})
export class MealDayDetailComponent implements OnInit {
  dayPlan?: DayPlan;
  private currentPlan: MealPlan | undefined;

  constructor(
    private route: ActivatedRoute,
    private mealPlanService: MealPlanService
  ) {}

  ngOnInit(): void {
    const userId = '123'
    const dayName = this.route.snapshot.paramMap.get('day');
    this.mealPlanService.getCurrentPlan(userId).subscribe({
      next: plan => {
        this.currentPlan = plan;
      },
      error: err => {
        console.error('Error al cargar el mock del plan:', err);
      }
    }); // ← puedes mockear o implementar este método

    // @ts-ignore
    this.dayPlan = this.currentPlan.days.find(d => d.day === dayName!);
  }
}
*/
