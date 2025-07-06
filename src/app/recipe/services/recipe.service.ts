import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, map, Observable} from 'rxjs';
import {environment, environment as env} from '../../../environments/environment';
import {MealPlan, MealPlanRecipe} from '../../meal-plan/model/meal-plan.entity';
import {Recipe} from '../model/recipe.entity';
import {MealPlanRecipeResponse, RecipeResponse} from '../../meal-plan/services/meal-plan.response';
import {MealPlanRecipeAssembler} from '../../meal-plan/services/meal-plan.assembler';
import {FavoriteRecipe, Ingredient, Macros, RecipeIngredient} from '../model/recipe.entity';
import {FavoriteRecipeAssembler, MacrosAssembler, RecipeAssembler, RecipeIngredientAssembler, IngredientAssembler} from './recipe.assembler';
import {FavoriteRecipeResponse, IngredientResponse, MacrosResponse, RecipeIngredientResponse} from './recipe.response';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipeResponse[]>(`${environment.apiUrl}/recipe`).pipe(
      map(data => RecipeAssembler.toEntityFromResponseArray(data))
    );
  }
  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<IngredientResponse[]>(`${env.apiUrl}/ingredients`).pipe(
      map(data => IngredientAssembler.toEntityFromResponseArray(data))
    );
  }
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<RecipeResponse>(`${environment.apiUrl}/recipe/${id}`).pipe(
      map(data => RecipeAssembler.toEntityFromResponse(data))
    );
  }

  getRecipeByPlanId(id: string): Observable<Recipe[]> {
    return this.http.get<RecipeResponse[]>(`${env.apiUrl}recipes`).pipe(
      map(data => RecipeAssembler.toEntityFromResponseArray(data).filter(recipe => recipe.id.toString() === id))
    );
  }

  getFavoriteRecipesByUserId(user_id: string): Observable<Recipe[]> {
    return forkJoin({
      allRecipes: this.http.get<RecipeResponse[]>(`${env.apiUrl}/recipe`),
      favorites: this.http.get<FavoriteRecipeResponse[]>(`${env.apiUrl}/favorite/${user_id}`)
    }).pipe(
      map(({ allRecipes, favorites }) => {
        const recipeEntities = RecipeAssembler.toEntityFromResponseArray(allRecipes);
        console.log(recipeEntities);
        const favoriteIds = favorites.map(fav => fav.recipeId);
        console.log(favoriteIds);
        return recipeEntities.filter(recipe =>
          favoriteIds.includes((recipe.id))
        );

      })
    );
  }

  saveFavoriteRecipe(favoriteRecipe:any): Observable<FavoriteRecipe> {
    return this.http.post<FavoriteRecipeResponse>(`${env.apiUrl}/favorite`, favoriteRecipe).pipe(
      map(data => FavoriteRecipeAssembler.toEntityFromResponse(data))
    );
  }

  getIngredientsByRecipeId(id: string): Observable<Ingredient[]> {
    return this.http.get<IngredientResponse[]>(`${env.apiUrl}ingredients`).pipe(
      map(data => IngredientAssembler.toEntityFromResponseArray(data)
        .filter(ingredient => ingredient.id.toString() === id)
      )
    );
  }
  saveRecipe(recipe: Recipe): Observable<any> {
    return this.http.post<RecipeResponse>(`${env.apiUrl}/recipe`, recipe).pipe(
      map((data: RecipeResponse) => RecipeAssembler.toEntityFromResponse(data))
    );
  }
  saveRecipeIngredients(recipeIngredients: any[]): Observable<any> {
    console.log('Enviando al backend:', recipeIngredients);
    return this.http.post<any>(`${environment.apiUrl}/recipe_ingredients`, recipeIngredients);
  }
  updateRecipe(id: string, data: {recipe: Recipe;}): Observable<any> {
    return this.http.put(`${env.apiUrl}/recipe/${id}`, data.recipe);

  }
  updateRecipeIngredient(id: string, recipeIngredient: RecipeIngredient): Observable<any> {
    return this.http.put(`${env.apiUrl}/recipe_ingredients/${id}`, recipeIngredient);
  }

  createRecipeIngredient(recipeIngredient: RecipeIngredient): Observable<RecipeIngredient> {
    return this.http.post<RecipeIngredientResponse>(`${env.apiUrl}/recipe_ingredients`, recipeIngredient).pipe(
      map(data => RecipeIngredientAssembler.toEntityFromResponse(data))
    );
  }
  removeRecipeIngredient(id: string): Observable<any> {
    return this.http.delete(`${env.apiUrl}/recipe_ingredients/${id}`);
  }
  getRecipeIngredientsByRecipeId(id: string): Observable<RecipeIngredient[]> {
    return this.http.get<RecipeIngredientResponse[]>(`${env.apiUrl}/recipe_ingredients/${id}`).pipe(
      map(data => RecipeIngredientAssembler.toEntityFromResponseArray(data))
    );
  }
  removeFavorite(recipe_id: string, user_id:string): void {
    this.http.get<FavoriteRecipeResponse[]>(`${env.apiUrl}favorite_recipes?user_id=${user_id}`).subscribe({
        next: (favorites) => {
          const favoriteToDelete = favorites.find(fav => fav.recipeId.toString() === recipe_id);

          if (favoriteToDelete) {
            this.http.delete(`${env.apiUrl}favorite_recipes/${favoriteToDelete.id}`).subscribe({
              next: () => console.log('Favorito eliminado correctamente'),
              error: (err) => console.error('Error al eliminar favorito:', err)
            });
          }
        }
      }
    );}
}
