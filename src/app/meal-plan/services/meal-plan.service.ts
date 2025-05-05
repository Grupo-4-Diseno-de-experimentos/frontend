import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {MealPlan, MealPlanRecipe, Recipe} from '../model/meal-plan.entity';
import {MealPlanRecipeResponse, MealPlanResponse, RecipeResponse} from './meal-plan.response';
import {MealPlanAssembler, MealPlanRecipeAssembler, RecipeAssembler} from './meal-plan.assembler';
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
      map(data => RecipeAssembler.toEntityFromResponseArray(data).filter(recipe => recipe.id.toString() === id))
    );
  }

}
