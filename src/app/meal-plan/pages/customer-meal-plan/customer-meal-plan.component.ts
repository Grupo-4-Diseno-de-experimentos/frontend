import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../model/meal-plan.entity';
import { MealPlanService } from '../../services/meal-plan.service';
import {MatCard, MatCardActions, MatCardContent, MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MealItemComponent} from '../../components/meal-item/meal-item.component';
@Component({
  selector: 'app-customer-meal-plan',
  imports: [MatCardActions, MatCardContent, MatCardModule, MatCard, RouterLink, MatButton, NgForOf, FormsModule
  , MealItemComponent],
  templateUrl: './customer-meal-plan.component.html',
  styleUrl: './customer-meal-plan.component.css'
})
export class CustomerMealPlanComponent implements OnInit {
  mealPlans: MealPlan[] = [];
  filteredMealPlans: MealPlan[] = [];
  selectedGoal: string = '';
  selectedCategory: string = '';
  goals: string[] = [];
  categories: string[] = [];
  constructor(private dataService: MealPlanService) {
  }

  ngOnInit(): void {
    this.dataService.getAllMealPlans().subscribe({
      next: (data) => {
        console.log('Data fetched:', data);
        this.mealPlans = data;
        this.filteredMealPlans = data;
        this.goals = [...new Set(this.mealPlans.map(plan => plan.goal))];
        this.categories = [...new Set(this.mealPlans.map(plan => plan.category))];
      },
      error: (err) => console.error('Error fetching data:', err)

    })
  }
  filterByCategory(): void {
    if (this.selectedCategory) {
      this.filteredMealPlans = this.mealPlans.filter(plan => plan.category === this.selectedCategory);
    } else {
      this.filteredMealPlans = [...this.mealPlans];
    }
  }
  filterByGoal(): void {
    if (this.selectedGoal) {
      this.filteredMealPlans = this.mealPlans.filter(plan => plan.goal === this.selectedGoal);
    } else {
      this.filteredMealPlans = [...this.mealPlans];
    }
  }
}
