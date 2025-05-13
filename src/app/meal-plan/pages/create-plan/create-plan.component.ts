import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {NgForOf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MealPlan, Recipe} from '../../model/meal-plan.entity';
import {UserService} from '../../../user/services/user.service';
import {MealPlanService} from '../../services/meal-plan.service';
import {MatIcon} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-plan',
  imports: [MatCardModule, ReactiveFormsModule, MatSelectModule, MatInputModule, NgForOf,
    MatButton, MatFormFieldModule, MatIcon, MatExpansionModule, MatIconButton],
  templateUrl: './create-plan.component.html',
  standalone: true,
  styleUrl: './create-plan.component.css'
})
export class CreatePlanComponent implements OnInit {
  mealPlanForm: FormGroup;
  day = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  mealTimes = ['Desayuno', 'Almuerzo', 'Cena'];
  allRecipes: Recipe[] = [];
  availableRecipes: any;
  meals: any;
  days:any;

  constructor(private fb: FormBuilder,private userService: UserService, private mealPlanService: MealPlanService,private router: Router) {
    this.mealPlanForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      goal: ['', Validators.required],
      min_bmi: ['', [Validators.required, Validators.min(10)]],
      max_bmi: ['', [Validators.required, Validators.max(60)]],
      min_age: ['', [Validators.required, Validators.min(1)]],
      max_age: ['', [Validators.required, Validators.max(120)]],
      calories_per_d: ['', Validators.required],
      recipesByDay: this.fb.array([])
    });

    this.initRecipePlanStructure();

  }

  ngOnInit(): void {
  this.fetchAllRecipes();
  }

  fetchAllRecipes() {
    this.mealPlanService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.allRecipes = recipes;
        console.log('Recetas disponibles:', this.allRecipes);
        this.availableRecipes = this.allRecipes.map(recipe => ({
          id: recipe.id,
          title: recipe.title
        }));
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      }
    })
  }
  getMealsControls(dayIndex: number): FormArray {
    return this.recipesByDay.at(dayIndex).get('meals') as FormArray;
  }

  get recipesByDay(): FormArray {
    return this.mealPlanForm.get('recipesByDay') as FormArray;
  }

  initRecipePlanStructure() {
    this.day.forEach(day => {
      this.recipesByDay.push(
        this.fb.group({
          day: [day],
          meals: this.fb.array(
            this.mealTimes.map(meal =>
              this.fb.group({
                meal_time: [meal],
                recipe_id: [null]
              })
            )
          )
        })
      );
    });
  }
  /*addMeal(){
    const meals = this.recipesByDay.at(0).get('meals') as FormArray;
    meals.push(
      this.fb.group({
        meal_time: [''],
        recipe_id: ['']
      })
    );
  }*/
  addMeal(dayIndex: number) {
    const meals = this.getMealsControls(dayIndex);
    meals.push(
      this.fb.group({
        meal_time: [''],
        recipe_id: [null],
      })
    );
  }

  removeMeal(dayIndex: number, mealIndex: number) {
    const meals = this.getMealsControls(dayIndex);
    meals.removeAt(mealIndex);
  }
  cancel(){
/*    this.mealPlanForm.reset();
    this.initRecipePlanStructure();*/
  }
/*  onSubmit() {
    if (this.mealPlanForm.valid) {
      const data = this.mealPlanForm.value;
      console.log('Plan enviado:', data);
      // Aquí harías el POST al backend
    } else {
      this.mealPlanForm.markAllAsTouched();
    }
  }*/

  onSubmit(): void {
    if (this.mealPlanForm.valid) {
      const mealPlan = this.mealPlanForm.value;
      console.log('Request enviado al backend:', mealPlan);
      this.mealPlanService.createMealPlan(mealPlan).subscribe({
        next: (response) => {
          console.log('Meal plan created successfully:', response);
          alert('Meal plan created successfully!');
          this.router.navigate(['/meal-plans']);
        },
        error: (error) => {
          console.error('Error creating meal plan:', error);
          alert('Error creating meal plan.');
        }
      });
    } else {
      this.mealPlanForm.markAllAsTouched();
    }
  }
}
