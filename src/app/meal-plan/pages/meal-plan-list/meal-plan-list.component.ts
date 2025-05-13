import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../model/meal-plan.entity';
import { MealPlanService } from '../../services/meal-plan.service';
import {MatCardModule} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MealItemComponent} from '../../components/meal-item/meal-item.component';
import {UserService} from "../../../user-profile/services/user.service";

@Component({
  selector: 'app-meal-plan-list',
  imports: [MatCardModule, NgForOf, FormsModule
    , MealItemComponent, NgIf],
  templateUrl: './meal-plan-list.component.html',
  standalone: true,
  styleUrl: './meal-plan-list.component.css'
})
export class MealPlanListComponent implements OnInit {
  mealPlans: MealPlan[] = [];
  filteredMealPlans: MealPlan[] = [];
  selectedGoal: string = '';
  selectedCategory: string = '';
  goals: string[] = [];
  categories: string[] = [];
  constructor(private dataService: MealPlanService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    const user = this.userService.getUserId();

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
  get isNutricionist() {
    return this.userService.isNutricionist();
  }
  goToCreateMealPlan(): void {
    this.router.navigate(['/meal_plan/create-plan']);
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
  filterByNutritionist(): void {
    const userId = this.userService.getUserId();
    this.filteredMealPlans = this.mealPlans.filter(plan => plan.nutricionist_id.toString() === userId);
  }
  resetFilters(): void {
    this.filteredMealPlans = [...this.mealPlans];
  }
}
