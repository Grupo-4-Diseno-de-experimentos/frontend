import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardModule,
} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {CustomerMealPlan} from '../../model/meal-plan.entity';
import {MealPlanService} from '../../services/meal-plan.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {UserService} from '../../../user/services/user.service';
@Component({
  selector: 'app-meal-plan-history',
    imports: [
      MatCardActions,
      MatIcon,
      NgIf,
      MatCard,
      MatCardModule,
      MatCardContent,
      MatButton,
      MatIconButton,
      MatTooltip,
      NgForOf
    ],
  templateUrl: './meal-plan-history.component.html',
  styleUrl: './meal-plan-history.component.css'
})
export class MealPlanHistoryComponent {
  historyMealPlan: CustomerMealPlan[] = [];

  constructor(
    private mealPlanService: MealPlanService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchRecipeFavorites();
  }
  fetchRecipeFavorites(): void {
    this.mealPlanService.getCustomerMealPlans(this.userService.getUserId().toString()).subscribe({
      next: (customerMealPlan) => {
        console.log('customer MealPlans:', customerMealPlan);
        this.historyMealPlan = customerMealPlan;
      },
      error: (err) => {
        console.error('Error fetching customer MealPlan:', err);
      }
    });
  }
  goToDetail(id: number): void {
    this.router.navigate(['/recipe/recipedetail', id]);
  }

/*  removeFromFavorites(id: number): void {
    this.favoriteRecipes = this.favoriteRecipes.filter(r => r.id !== id);
    this.recipeService.removeFavorite(id.toString()).subscribe();
  }*/
}

