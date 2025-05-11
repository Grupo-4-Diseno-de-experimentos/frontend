import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import {CustomerMealPlan, MealPlan, MealPlanRecipe, Recipe} from '../model/meal-plan.entity';
import {CustomerMealPlanResponse, MealPlanRecipeResponse, MealPlanResponse, RecipeResponse} from './meal-plan.response';
import {
  CustomerMealPlanAssembler,
  MealPlanAssembler,
  MealPlanRecipeAssembler,
  RecipeAssembler
} from './meal-plan.assembler';
import {environment as env} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  constructor(private http: HttpClient) {
  }

  /*getMealPlans(userId: string): Observable<MealPlan[]> {
    return this.http.get<MealPlanResponse[]>(env.apiUrl + '/meal-plans?userId=' + userId);
    /!*return this.http.get<MealPlan>(`${this.apiUrl}/current?userId=${userId}`);*!/
  }*/
/*  getAllMealPlans(key: string): Observable<MealPlan[]> {
    return this.http.get<{ [key: string]: MealPlanResponse[] }>(env.apiUrl).pipe(
      map(data => MealPlanAssembler.toEntityFromResponseArray(data[key])),
    );
  }*/
    getAllMealPlans(): Observable<MealPlan[]> {
      return this.http.get<MealPlanResponse[]>(`${env.apiUrl}meal_plans`).pipe(
        map(data => MealPlanAssembler.toEntityFromResponseArray(data)),
      );
    }
    saveMealPlan(mealPlan: MealPlan): Observable<any> {
      return this.http.post<MealPlanResponse>(`${env.apiUrl}meal_plans`, mealPlan).pipe(
         map(data => MealPlanAssembler.toEntityFromResponse(data))
      )
    }
  saveRecipesByDay(mealPlanRecipes: any[])  {
    mealPlanRecipes.forEach(
      mealPlanRecipe => {
        this.http.post<MealPlanRecipeResponse>(`${env.apiUrl}meal_plan_recipes`, mealPlanRecipe).pipe(
          map(data => MealPlanRecipeAssembler.toEntityFromResponse(data))
        ).subscribe({
            next: (mealPlanRecipe) => {
              console.log('mealPlanRecipe', mealPlanRecipe);
            },
            error: (error) => {
              console.error('Error saving meal plan recipe:', error);
            }
          }
        )
        console.log('mealPlanRecipe', mealPlanRecipe);
      }
    );
  }
  updateMealPlan(mealPlanid: string, data: {mealPlan: MealPlan; recipes: MealPlanRecipe[]}): Observable<any> {
    const updateMealPlan$ = this.http.put(`${env.apiUrl}meal_plans/${mealPlanid}`, data.mealPlan);
    const updateRecipes$ = data.recipes.map(recipe =>
      this.http.put(`${env.apiUrl}meal_plan_recipes/${recipe.id}`, recipe)
    );

    // Combine all Observables (meal plan and recipes) into a single Observable
    return forkJoin([updateMealPlan$, ...updateRecipes$]);
  }

  deleteMealPlanRecipesByPlanId(planId: string): Observable<any> {
    return this.http.delete(`${env.apiUrl}meal_plan_recipes?meal_plan_id=${planId}`);
  }
  createMealPlanRecipe(data: MealPlanRecipe): Observable<any> {
    return this.http.post(`${env.apiUrl}meal_plan_recipes`, data);
  }

/*  updateFullMealPlan(planId: string, updatedPlan: MealPlan, updatedMeals: MealPlanRecipe[]) {
    return this.updateMealPlan(planId, updatedPlan).pipe(
      switchMap(() => this.deleteMealPlanRecipesByPlanId(planId)),
      switchMap(() => forkJoin(updatedMeals.map(meal =>
        this.createMealPlanRecipe(meal)
      )))
    );
  }*/

/*    updateMealPlan(id: string, data: { mealPlan: MealPlan; recipes: MealPlanRecipe[] }): Observable<any> {
      return this.http.put(`${env.apiUrl}meal_plans/${id}`, data);
    }*/
    updateRecipe(id: string, data: { recipe: Recipe }): Observable<any> {
      return this.http.put(`${env.apiUrl}recipes/${id}`, data);
    }
    updateMealPlanRecipe(id: string, data: { mealPlanRecipe: MealPlanRecipe }): Observable<any> {
      return this.http.put(`${env.apiUrl}meal_plan_recipes/${id}`, data);

    }
  deleteMealPlan(id: string): Observable<any> {
    return this.http.delete(`${env.apiUrl}meal_plans/${id}`);
  }
  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${env.apiUrl}recipes/${id}`);
  }
  deleteMealPlanRecipe(id: string): Observable<any> {
    return this.http.delete(`${env.apiUrl}meal_plan_recipes/${id}`);
  }

  getDetailsMealPlanbyId(id: string): Observable<MealPlan> {
    return this.http.get<MealPlanResponse>(`${env.apiUrl}meal_plans/${id}`).pipe(
      map(data => MealPlanAssembler.toEntityFromResponse(data))
    );
  }
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<RecipeResponse>(`${env.apiUrl}recipes/${id}`).pipe(
      map(data => RecipeAssembler.toEntityFromResponse(data))
    );
  }
  getCustomerMealPlans(userId: string): Observable<CustomerMealPlan[]> {
    return this.http.get<CustomerMealPlanResponse[]>(`${env.apiUrl}customer_meal_plan`).pipe(
      map(data => CustomerMealPlanAssembler.toEntityFromResponseArray(data)
        .filter(customerMealPlan => customerMealPlan.customer_id.toString() === userId))
    );
  }
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipeResponse[]>(`${env.apiUrl}recipes`).pipe(
      map(data => RecipeAssembler.toEntityFromResponseArray(data))
    );
  }

  getMealPlanRecipesByplanId(id: string): Observable<MealPlanRecipe[]> {
    return this.http.get<MealPlanRecipeResponse[]>(`${env.apiUrl}meal_plan_recipes`).pipe(
      map(data => MealPlanRecipeAssembler.toEntityFromResponseArray(data).filter(recipe => recipe.meal_plan_id.toString() === id))
    );
  }
  getRecipeByPlanId(id: string): Observable<Recipe[]> {
    return this.http.get<RecipeResponse[]>(`${env.apiUrl}recipes`).pipe(
      map(data => RecipeAssembler.toEntityFromResponseArray(data)
        .filter(recipe => recipe.id.toString() === id))
    );
  }

}
