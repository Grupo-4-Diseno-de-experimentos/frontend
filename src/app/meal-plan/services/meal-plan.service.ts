import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, map, Observable, switchMap, tap} from 'rxjs';
import {CustomerMealPlan, MealPlan, MealPlanRecipe, Recipe} from '../model/meal-plan.entity';
import {
  CreateMealPlanRequest,
  CustomerMealPlanResponse,
  MealPlanRecipeResponse,
  MealPlanResponse,
  RecipeResponse
} from './meal-plan.response';
import {
  CustomerMealPlanAssembler,
  MealPlanAssembler,
  MealPlanRecipeAssembler,
  RecipeAssembler
} from './meal-plan.assembler';
import {environment, environment as env} from '../../../environments/environment';
import {BaseService} from '../../public/components/base-service/base.service';
@Injectable({
  providedIn: 'root'
})
export class MealPlanService extends BaseService<MealPlan>{
  private mealSubject = new BehaviorSubject<any>(null);
  constructor(http: HttpClient) {
    super(http,`${environment.apiUrl}/mealPlaner`)
  }
   getAllMealPlans(): Observable<MealPlan[]> {
    return this.http.get<MealPlan[]>(`${environment.apiUrl}/mealPlaner`);
   }
    saveMealPlan(mealPlan: MealPlan): Observable<any> {
      return this.http.post<MealPlanResponse>(`${env.apiUrl}/meal_plans`, mealPlan).pipe(
         map(data => MealPlanAssembler.toEntityFromResponse(data))
      )
    }
  saveRecipesByDay(mealPlanRecipes: any[])  {
    mealPlanRecipes.forEach(
      mealPlanRecipe => {
        this.http.post<MealPlanRecipeResponse>(`${env.apiUrl}/mealPlanRecipes`, mealPlanRecipe).pipe(
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
  /*updateMealPlan(mealPlanid: string, data: {mealPlan: MealPlan; recipes: MealPlanRecipe[]}): Observable<any> {
    const updateMealPlan$ = this.http.put(`${env.apiUrl}meal_plans/${mealPlanid}`, data.mealPlan);
    const updateRecipes$ = data.recipes.map(recipe =>
      this.http.put(`${env.apiUrl}meal_plan_recipes/${recipe.id}`, recipe)
    );

    // Combine all Observables (meal plan and recipes) into a single Observable
    return forkJoin([updateMealPlan$, ...updateRecipes$]);
  }*/

  deleteMealPlanRecipesByPlanId(planId: string): Observable<any> {
    return this.http.delete(`${env.apiUrl}/meal_plan_recipes?meal_plan_id=${planId}`);
  }

  createMealPlan(mealPlan: CreateMealPlanRequest): Observable<MealPlanResponse>{
    return this.http.post<MealPlanResponse>(`${environment.apiUrl}/mealPlanRecipes`, mealPlan);
  }

  updateMealPlan(id:number, mealPlan: MealPlan): Observable<MealPlan>{
    return this.http.put<MealPlan>(`${environment.apiUrl}/mealPlaner/${id}`, mealPlan);
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
      return this.http.put(`${environment.apiUrl}/recipe/${id}`, data);
    }
    updateMealPlanRecipe(id: string, data: { mealPlanRecipe: MealPlanRecipe }): Observable<any> {
      return this.http.put(`${env.apiUrl}/meal_plan_recipes/${id}`, data);

    }
  deleteMealPlan(id: string): Observable<any> {
    return this.http.delete(`${env.apiUrl}/meal_plans/${id}`);
  }
  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/recipe/${id}`);
  }
  deleteMealPlanRecipe(id: string): Observable<any> {
    return this.http.delete(`${env.apiUrl}/mealPlanRecipes/${id}`);
  }
  getMealPlanById(id: number): Observable<MealPlan> {
    return this.http.get<MealPlan>(`${environment.apiUrl}/mealPlaner/${id}`);
  }
  getDetailsMealPlanbyId(id: string): Observable<MealPlan> {
    return this.http.get<MealPlanResponse>(`${environment.apiUrl}/mealPlaner/${id}`).pipe(
      map(data => MealPlanAssembler.toEntityFromResponse(data))
    );
  }
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<RecipeResponse>(`${environment.apiUrl}/recipe/${id}`).pipe(
      map(data => RecipeAssembler.toEntityFromResponse(data))
    );
  }
  getCustomerMealPlans(userId: string): Observable<CustomerMealPlan[]> {
    return this.http.get<CustomerMealPlanResponse[]>(`${env.apiUrl}/customer_meal_plan`).pipe(
      map(data => CustomerMealPlanAssembler.toEntityFromResponseArray(data)
        .filter(customerMealPlan => customerMealPlan.customer_id.toString() === userId))
    );
  }
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipeResponse[]>(`${environment.apiUrl}/recipe`).pipe(
      map(data => RecipeAssembler.toEntityFromResponseArray(data))
    );
  }

  getMealPlanRecipesByplanId(planId: string): Observable<MealPlanRecipe[]> {
    const numericPlanId = Number(planId);
    return this.http.get<MealPlanRecipeResponse[]>(`${environment.apiUrl}/mealPlanRecipes/${planId}`).pipe(
      tap(data => console.log('Respuesta cruda del backend:', data)), // <-- agrega esto
      map(data =>
        MealPlanRecipeAssembler.toEntityFromResponseArray(data))
    );
  }
  getRecipeByPlanId(id: string): Observable<Recipe[]> {
    return this.http.get<RecipeResponse[]>(`${environment.apiUrl}/recipe`).pipe(
      map(data => RecipeAssembler.toEntityFromResponseArray(data)
        .filter(recipe => recipe.id.toString() === id))
    );
  }

}
