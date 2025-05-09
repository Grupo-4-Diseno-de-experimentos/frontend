import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-create-plan',
  imports: [MatCardModule, ReactiveFormsModule, MatSelectModule , MatInputModule, NgForOf, MatButton, MatFormFieldModule],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.css'
})
export class CreatePlanComponent implements OnInit {
  mealPlanForm!: FormGroup;
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  mealTimes = ['Desayuno', 'Almuerzo', 'Cena'];

  recipesMock = [
    { id: 1, title: 'Ensalada César' },
    { id: 2, title: 'Pollo al horno' },
    { id: 3, title: 'Arroz integral con vegetales' }
  ];
  availableRecipes: any;
  meals: any;
  days:any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.mealPlanForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      goal: ['', Validators.required],
      min_bmi: ['', [Validators.required, Validators.min(10)]],
      max_bmi: ['', [Validators.required, Validators.max(60)]],
      min_age: ['', [Validators.required, Validators.min(1)]],
      max_age: ['', [Validators.required, Validators.max(120)]],
      calories_per_day: ['', Validators.required],
      recipesByDay: this.fb.array([])
    });

    this.initRecipePlanStructure();
  }
  getMealsControls(dayIndex: number): FormArray {
    return this.recipesByDay.at(dayIndex).get('meals') as FormArray;
  }

  get recipesByDay(): FormArray {
    return this.mealPlanForm.get('recipesByDay') as FormArray;
  }

  initRecipePlanStructure() {
    this.daysOfWeek.forEach(day => {
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
  addMeal(){
/*    const meals = this.recipesByDay.at(0).get('meals') as FormArray;
    meals.push(
      this.fb.group({
        meal_time: [''],
        recipe_id: ['']
      })
    );*/
  }
  cancel(){
/*    this.mealPlanForm.reset();
    this.initRecipePlanStructure();*/
  }
  onSubmit() {
    if (this.mealPlanForm.valid) {
      const data = this.mealPlanForm.value;
      console.log('Plan enviado:', data);
      // Aquí harías el POST al backend
    } else {
      this.mealPlanForm.markAllAsTouched();
    }
  }
}
