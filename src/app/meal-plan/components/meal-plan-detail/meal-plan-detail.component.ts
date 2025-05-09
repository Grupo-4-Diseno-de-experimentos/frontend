import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
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
import {MatSelectModule} from '@angular/material/select';
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
    MatExpansionModule,
    MatSelectModule
  ],
  templateUrl: './meal-plan-detail.component.html',
  styleUrl: './meal-plan-detail.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MealPlanDetailComponent implements OnInit{
  planId!: string;
  mealPlan!: MealPlan;
  recipesbyPlanId: Recipe[] = [];
  AllRecipes: Recipe[] = [];
  mealPlanRecipes: MealPlanRecipe[] = [];
  recipesIdsByMealPlanRecipes: number[] = [];
  isEditing = false;

  constructor(private route: ActivatedRoute, private mealPlanService: MealPlanService, private userService: UserService,
  private router: Router) {}

  get isNutricionist() {
    return this.userService.isNutricionist();
  }

  goToRecipeDetail(id: number): void {
    console.log('Navegando a detalle de receta', id);
    this.router.navigate(['/recipe/recipedetail', id.toString()]);
  }
  goToCreateRecipe(){
    this.router.navigate(['/recipe/create-recipe']);
  }
  ngOnInit(): void {
    this.planId = this.route.snapshot.paramMap.get('id')!;
    this.fetchMealPlanDetails();
    this.fetchMealPlanRecipes();
    this.fetchRecipes()
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
  fetchRecipes(): void {
    this.mealPlanService.getAllRecipes().subscribe({
      next: (recipes) => {
        console.log('Recipes:', recipes);
        this.AllRecipes = recipes;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      }
    });
  }
  fetchRecipeByPlanId(): void {
    this.recipesIdsByMealPlanRecipes.forEach(id =>{
      this.mealPlanService.getRecipeByPlanId(id.toString()).subscribe({
        next: (recipes) => {
          //pusheo las recetas que me trae por id a un array
          recipes.forEach(recipe => this.recipesbyPlanId.push(recipe));
          console.log('Recipe by ID:', this.recipesbyPlanId);
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
/*  onSubmit(): void {
    if (this.mealPlanForm.valid) {
      const planId = this.mealPlanId; // el ID del plan actual
      const formValue = this.mealPlanForm.value;

      // 1. Armas el objeto MealPlan
      const mealPlan: MealPlan = {
        id: planId,
        name: formValue.name,
        category: formValue.category,
        description: formValue.description,
        goal: formValue.goal,
        min_bmi: formValue.min_bmi,
        max_bmi: formValue.max_bmi,
        min_age: formValue.min_age,
        max_age: formValue.max_age,
        calories_per_day: formValue.calories_per_day,
        nutricionist_id: this.currentUserId,
        created_at: new Date()  // o lo que necesites
      };

      // 2. Armas los objetos MealPlanRecipe
      const mealPlanRecipes: MealPlanRecipe[] = [];

      formValue.recipesByDay.forEach((dayGroup: any) => {
        const day = dayGroup.day;
        dayGroup.meals.forEach((meal: any) => {
          mealPlanRecipes.push({
            id: 0, // si es autogenerado
            day: day,
            meal_time: meal.meal_time,
            recipe_id: meal.recipe_id,
            meal_plan_id: planId
          });
        });
      });

      // 3. Llamas al servicio para actualizar todo
      this.mealPlanService.updateFullMealPlan(planId, mealPlan, mealPlanRecipes).subscribe({
        next: () => {
          alert('¡Plan actualizado exitosamente!');
          this.router.navigate(['/meal_plan']); // o donde quieras redirigir
        },
        error: (err) => {
          console.error('Error al actualizar el plan:', err);
          alert('Error al actualizar el plan.');
        }
      });

    } else {
      this.mealPlanForm.markAllAsTouched();
    }
  }*/
  deleteMealPlanRecipe(mealPlanRecipe: MealPlanRecipe) {
    this.mealPlanService.deleteMealPlanRecipe(mealPlanRecipe.id.toString()).subscribe({
      next: (response) => {
        console.log('Receta eliminada con éxito:', response);
        this.fetchMealPlanRecipes();
      },
      error: (err) => {
        console.error('Error al eliminar la receta:', err);
        alert('Error al eliminar la receta.');
      }
    });
  }

  saveChanges() {
      console.log('Meal Plan:', this.mealPlan); // Captura el título y descripción
      console.log('Meal Plan Recipes:', this.mealPlanRecipes); // Captura las recetas asociadas
      // Aquí puedes enviar los datos al backend
      this.mealPlanService.updateMealPlan(this.mealPlan.id.toString(), {
        mealPlan: this.mealPlan,
        recipes: this.mealPlanRecipes
      }).subscribe({
        next: (response) => {
          console.log('Plan actualizado con éxito:', response);
/*          alert('¡Plan actualizado exitosamente!');*/
        },
        error: (err) => {
          console.error('Error al actualizar el plan:', err);
          alert('Error al actualizar el plan.');
        }
      });
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
    // opcional: restaurar valores originales si hiciste una copia
  }

  protected readonly findIndex = findIndex;
}
