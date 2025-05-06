import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import {MealPlan, MealPlanRecipe, Recipe} from '../../model/meal-plan.entity';
import {MealPlanService} from '../../services/meal-plan.service';
import {UserService} from '../../../user/services/user.service';

import {
  MatCard,
  MatCardActions, MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel, MatInputModule} from '@angular/material/input';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle,
  MatExpansionModule
} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';
import {findIndex} from 'rxjs';
@Component({
  selector: 'app-meal-plan-detail',
  imports: [
    NgForOf,
    FormsModule,
    MatButton,
    NgIf,
    MatInputModule,
    MatCardTitle,
    MatCard,
    MatCardContent,
    MatCardSubtitle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatCardActions,
    MatExpansionPanelTitle,
    MatCardHeader,
    MatIconButton,
    MatCardAvatar,
    MatFabButton,
    MatExpansionModule
  ],
  templateUrl: './meal-plan-detail.component.html',
  styleUrl: './meal-plan-detail.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MealPlanDetailComponent implements OnInit{
  planId!: string;
  mealPlan!: MealPlan;
  recipes: Recipe[] = [];
  mealPlanRecipes: MealPlanRecipe[] = [];
  recipesIdsByMealPlanRecipes: number[] = [];
  isEditing = false;

  constructor(private route: ActivatedRoute, private mealPlanService: MealPlanService, private userService: UserService) {}

  get isNutricionist() {
    return this.userService.currentRole === 'nutritionist';
  }
  ngOnInit(): void {
    this.planId = this.route.snapshot.paramMap.get('id')!;
    this.fetchMealPlanDetails();
    this.fetchMealPlanRecipes();
  }
  fetchMealPlanDetails(): void {
    this.mealPlanService.getDetailsMealPlanbyId(this.planId).subscribe({
      next: (plan) => {
        console.log('Meal plan details:', plan);
        this.mealPlan = plan;
      },
      error: (err) => {
        console.error('Error fetching meal plan details:', err);
      }
    });
  }
/*  fetchRecipes(): void {
    this.mealPlanService.getAllRecipes().subscribe({
      next: (recipes) => {
        console.log('Recipes:', recipes);
        this.recipes = recipes;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      }
    });
  }*/
  fetchRecipeByPlanId(): void {
    this.recipesIdsByMealPlanRecipes.forEach(id =>{
      this.mealPlanService.getRecipeByPlanId(id.toString()).subscribe({
        next: (recipes) => {
          //pusheo las recetas que me trae por id a un array
          recipes.forEach(recipe => this.recipes.push(recipe));
          console.log('Recipe by ID:', this.recipes);
        },
        error: (err) => {
          console.error('Error fetching recipe by ID:', err);
        }
      });
    })
  }
  fetchMealPlanRecipes(): void {
    this.mealPlanService.getMealPlanRecipesByplanId(this.planId).subscribe({
      next: (plans) => {
        console.log('Meal plan recipes:', plans);
        this.mealPlanRecipes = plans;
        //adquiero todos los ids de las recetas que solo estan en los planes
        plans.forEach(plan => this.recipesIdsByMealPlanRecipes.push(plan.recipe_id))
        //una vez que tengo los ids de las recetas que solo estan en los planes, llamo a la funcion que me trae las recetas por id
        this.fetchRecipeByPlanId();
      },
      error: (err) => {
        console.error('Error fetching meal plan recipes:', err);
      }
    });
  }

  enableEdit() {
    this.isEditing = true;
  }

  saveChanges() {
    // aquí podrías llamar al backend
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
    // opcional: restaurar valores originales si hiciste una copia
  }

  protected readonly findIndex = findIndex;
}
