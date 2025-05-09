import { Component, Input } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MealPlan} from '../../model/meal-plan.entity';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Router, RouterLink} from '@angular/router';
@Component({
  selector: 'app-meal-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './meal-item.component.html',
  styleUrl: './meal-item.component.css'
})
export class MealItemComponent {
  @Input() plan!: MealPlan;

  constructor(private router: Router) {}

  goToDetail(): void {
    this.router.navigate(['meal_plan/plandetail', this.plan.id]);
  }
}
