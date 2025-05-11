import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, map, Observable} from 'rxjs';
import {environment as env} from '../../../environments/environment';
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
    return this.http.get<RecipeResponse[]>(`${env.apiUrl}recipes`).pipe(
      map(data => RecipeAssembler.toEntityFromResponseArray(data))
    );
  }
  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<IngredientResponse[]>(`${env.apiUrl}ingredients`).pipe(
      map(data => IngredientAssembler.toEntityFromResponseArray(data))
    );
  }
/*  updateRecipe(): Observable<Recipe> {
    return this.http.put<RecipeResponse>(`${env.apiUrl}recipes`, {
      name: 'name',
      description: 'description',
      category: 'category',
      goal: 'goal',
      image: 'image',
      ingredients: [],
      macros: [],
      favorite: false
    })
  }*/
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<RecipeResponse>(`${env.apiUrl}recipes/${id}`).pipe(

      map(data => RecipeAssembler.toEntityFromResponse(data))
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

/*  getFavoriteRecipesByUserId(user_id: string): Observable<RecipeResponse[]> {
    let recipes = this.http.get<RecipeResponse[]>(`${env.apiUrl}recipes`).pipe(
      map(data => RecipeAssembler.toEntityFromResponseArray(data))
    )
    return this.http.get<FavoriteRecipeResponse[]>(`${env.apiUrl}favorite_recipes/${user_id}`).pipe(
      map(data => {
        recipes.map(recipe => {
        FavoriteRecipeAssembler.toEntityFromResponseArray(data).filter(recipe => recipe.user_id.toString() === recipe.id)
        })
      })
    )
  }*/
  getFavoriteRecipesByUserId(user_id: string): Observable<Recipe[]> {
    return forkJoin({
      allRecipes: this.http.get<RecipeResponse[]>(`${env.apiUrl}recipes`),
      favorites: this.http.get<FavoriteRecipeResponse[]>(`${env.apiUrl}favorite_recipes/?user_id=${user_id}`)
    }).pipe(
      map(({ allRecipes, favorites }) => {
        const recipeEntities = RecipeAssembler.toEntityFromResponseArray(allRecipes);
        console.log(recipeEntities);
        const favoriteIds = favorites.map(fav => fav.recipe_id);
        console.log(favoriteIds);
        return recipeEntities.filter(recipe =>
          favoriteIds.includes(Number(recipe.id))
        );

      })
    );
  }

  getAllMacros(): Observable<Macros[]> {
    return this.http.get<MacrosResponse[]>(`${env.apiUrl}macros`).pipe(
      map(data => MacrosAssembler.toEntityFromResponseArray(data))
    )
  }
  getIngredientsByRecipeId(id: string): Observable<Ingredient[]> {
    return this.http.get<IngredientResponse[]>(`${env.apiUrl}ingredients`).pipe(
      map(data => IngredientAssembler.toEntityFromResponseArray(data)
        .filter(ingredient => ingredient.id.toString() === id)
      )
    );
  }
  saveRecipe(recipe: Recipe): Observable<any> {
    return this.http.post<RecipeResponse>(`${env.apiUrl}recipes`, recipe).pipe(
      map(data => RecipeAssembler.toEntityFromResponse(data))
    );
  }
  saveRecipeIngredients(recipeIngredient: any[]) {
    recipeIngredient.forEach(item => {
      this.http.post<RecipeIngredientResponse>(`${env.apiUrl}recipe_ingredients`, item).pipe(
        map(data => RecipeIngredientAssembler.toEntityFromResponse(data))
      ).subscribe({
        next: (response) => {
          console.log('Recipe ingredient saved:', response);
        },
        error: (error) => {
          console.error('Error saving recipe ingredient:', error);
        }
      });
    })
  }
  updateRecipe(recipeId: string, data: {recipe: Recipe; recipesIngredient: RecipeIngredient[]}): Observable<any> {
    const updateRecipe$ = this.http.put(`${env.apiUrl}recipes/${recipeId}`, data.recipe);
    const updateRecipeIngredients$ = data.recipesIngredient.map(item =>
      this.http.put(`${env.apiUrl}recipe_ingredients/${item.id}`, item)
    );
    return forkJoin([updateRecipe$, ...updateRecipeIngredients$]);
  }
  getRecipeIngredientsByRecipeId(id:string): Observable<RecipeIngredient[]> {
    return this.http.get<RecipeIngredientResponse[]>(`${env.apiUrl}recipe_ingredients`).pipe(
      map(data => RecipeIngredientAssembler.toEntityFromResponseArray(data)
        .filter(recipeIngredient => recipeIngredient.recipe_id.toString() === id))
    )
  }
  removeFavorite(recipe_id: string, user_id:string): void {
    this.http.get<FavoriteRecipeResponse[]>(`${env.apiUrl}favorite_recipes?user_id=${user_id}`).subscribe({
      next: (favorites) => {
        const favoriteToDelete = favorites.find(fav => fav.recipe_id.toString() === recipe_id);

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
